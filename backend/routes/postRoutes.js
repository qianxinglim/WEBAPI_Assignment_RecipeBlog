const router = require('express').Router();
const { default: axios } = require('axios');
let Post = require('../models/postModel');

//ADD TO FAV
router.post('/add', async (req, res) => {
  const post = await Post.findOne({ userId: req.body.userId, recipeId: req.body.recipeId});
  
  if(post){
    //res.status(400).json("Post exists");
    try {
      const savedPost = await Post.deleteOne({userId: req.body.userId, recipeId: req.body.recipeId});
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else{
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//REMOVE FROM FAV
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET ALL POST
router.get('/', async (req, res) => {
  const area = req.query.area;
  const search = req.query.search; 
  const category = req.query.category; 
  //const userId = req.body.userId;

  try{
    
    if(search){
      await axios.get(
        `https://themealdb.com/api/json/v1/1/search.php?s=${search}`
      ).then((response) => {
        res.json(response.data.meals);
      });
    }
    else if(area){
      let firstResult = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?a=${area}`);

      let updatedResult = firstResult.data.meals.map(async item => {
        let meal = await axios.get('https://themealdb.com/api/json/v1/1/lookup.php?i=' + item.idMeal);

        return meal.data.meals[0]; 
      });

      Promise.all(updatedResult).then(finalResult => res.json(finalResult));
    }
    else if(category){
      let firstResult = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);

      let updatedResult = firstResult.data.meals.map(async item => {
        let meal = await axios.get('https://themealdb.com/api/json/v1/1/lookup.php?i=' + item.idMeal);
        //return item;
        return meal.data.meals[0]; 
      });

      Promise.all(updatedResult).then(finalResult => res.json(finalResult));
    }
    else{
      await axios.get(
        "https://themealdb.com/api/json/v1/1/search.php?s=Beef"
      ).then((response) => {
          res.json(response.data.meals);
      });

    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

//GET FAV POST
router.post('/favourite', async (req, res) => {
  let firstResult = await Post.find({userId: req.body.userId});
  // firstResult && res.json(firstResult);

  let updatedResult = firstResult.map(async item => {
    let meal = await axios.get('https://themealdb.com/api/json/v1/1/lookup.php?i=' + item.recipeId);

    return meal.data.meals[0]; 
  });

  Promise.all(updatedResult).then(finalResult => res.json(finalResult));
});

//GET SPECIFIC POST
router.post("/:id", async (req, res) => {
  const idMeal = req.params.id;
  const userId = req.body.userId;

  if(userId){
    let firstResult = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);

    let updatedResult = firstResult.data.meals.map(async item => {
      const post = await Post.findOne({ userId: userId, recipeId: idMeal});
        
        if(post){
          item.favourited = true;
        }
        else{
          item.favourited = false;
        }
  
        return item;
    });
  
    Promise.all(updatedResult).then(finalResult => res.json(finalResult[0]));
  }
  else{
    await axios.get(
      `https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    ).then((response) => {
      res.json(response.data.meals[0]);
    }).catch((error) => {
      res.status(500).json(error);
    });
  }
});

module.exports = router;
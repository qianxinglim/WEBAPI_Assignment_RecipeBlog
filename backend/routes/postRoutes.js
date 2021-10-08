const router = require('express').Router();
const { default: axios } = require('axios');
let Post = require('../models/postModel');

//ADD TO FAV
router.post('/add', async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET FAV
// router.get("/:id", async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       res.status(200).json(post);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

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

//SEARCH
// router.post('/search', async (req, res) => {
//     const query = req.body.query;

//     const querystr = `https://themealdb.com/api/json/v1/1/search.php?s=${query}`;

//     // const search = req.query.search;

//     // const querystr = `https://themealdb.com/api/json/v1/1/search.php?s=${search}`;

//     // axios.get(querystr).then((response) => {

//     //     for(response.data.results){
//     //         title = response.data.results[0].strMeal;
//     //         image = response.data.results[0].strMealThumb;
//     //         category = response.data.results[0].strCategory; 
//     //         area = response.data.results[0].strArea; 
//     //     }
//     // });
// });

// router.get('/', async (req, res) => {
//   const area = req.query.area;
//   const search = req.query.search; 
//   const category = req.query.category; 

//   let firstResult = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);

//   let updatedResult = firstResult.data.meals.map(async item => {
//     let meal = await axios.get('https://themealdb.com/api/json/v1/1/lookup.php?i=' + item.idMeal);
//     // people = {name: "John", id: 1, gender: male}
//     item.strInstructions = meal.strInstructions;

//     //console.log("meal: " + meal);

//     return item; 
//   });

//   Promise.all(updatedResult).then(finalResult  => res.json(finalResult));


//   // let fetchId = async() => {
//   //   const res = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);

//   //   const info = res.data.meals.idMeal;

//   //   const res2 = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${info}`);

//   //   const summoner = res2.data.meals;

//   //   return summoner;
//   // }

//   // res.json(fetchId);


//   // let peopleArray = [];
//   // axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`).then(people => {
//   //     people.forEach((person) => {
//   //       axios.get('https://themealdb.com/api/json/v1/1/lookup.php?i='.concat(person.idMeal.toString()))
//   //           .then(gender => {
//   //               peopleArray.push({id: person.id, name: person.name, gender, gender});
//   //           });
//   //     });

//   //     res.json(peopleArray);
//   // });
// });

//GET ALL POST
router.get('/', async (req, res) => {
  const area = req.query.area;
  const search = req.query.search; 
  const category = req.query.category; 

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

//GET SPECIFIC POST
router.get("/:id", async (req, res) => {
  const idMeal = req.params.id;

  await axios.get(
    `https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  ).then((response) => {
    res.json(response.data.meals[0]);
  }).catch((error) => {
    res.status(500).json(error);
  });

  // await axios.get(
  //   "https://themealdb.com/api/json/v1/1/search.php?s=chicken"
  // ).then((response) => {
    
  //   res.json(response.data.meals.find(meal => meal.idMeal.match(req.params.id)));

  // }).catch((error) => {
  //     res.status(500).json(error);
  // })
});

module.exports = router;
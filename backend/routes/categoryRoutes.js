const router = require('express').Router();
const { default: axios } = require('axios');

//GET ALL POST
router.get('/', async (req, res) => {
    await axios.get(
        "https://themealdb.com/api/json/v1/1/list.php?c=list"
    ).then((response) => {
        res.json(response.data.meals);
    }).catch((error) => {
        res.status(500).json(error);
    });
});

router.get('/area', async (req, res) => {
    await axios.get(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    ).then((response) => {
        res.json(response.data.meals);
    }).catch((error) => {
        res.status(500).json(error);
    });
});

module.exports = router;
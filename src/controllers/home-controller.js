const router = require('express').Router();

const housingService = require('../services/housing-service');


router.get('/', async (req, res) => {
    let housings = await housingService.getTopHouses()
    res.render('home',{housings})
});

router.get('/search', async (req, res)=>{
    let housings = await housingService.search(req.query.text);
    console.log(req.query.text);
    res.render('search',{housings} )
})

module.exports = router;
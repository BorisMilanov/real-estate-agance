const router = require('express').Router();

const housingService = require('../services/housing-service');

router.get('/aprt-for-recent', async (req, res) => {
    let housings =await housingService.getAll();
    res.render('housing/aprt-for-recent',{housings})
});

router.get('/create', (req, res) => {
    res.render('housing/create')
});

router.post('/create', async ( req, res) => {
    await housingService.create({...req.body, owner:req.user._id});

    res.redirect('/')
});

module.exports = router;
const router = require('express').Router();

const housingService = require('../services/housing-service');

router.get('/aprt-for-recent', (req, res) => {
    res.render('housing/aprt-for-recent')
});

router.get('/create', (req, res) => {
    res.render('housing/create')
});

router.post('/create', async ( req, res) => {
    await housingService.create({...req.body, owner:req.user._id});

    res.redirect('/')
});

module.exports = router;
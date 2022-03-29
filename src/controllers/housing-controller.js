const router = require('express').Router();

const housingService = require('../services/housing-service');

router.get('/aprt-for-recent', async (req, res) => {
    let housings = await housingService.getAll();
    res.render('housing/aprt-for-recent', { housings })
});

router.get('/create', (req, res) => {
    res.render('housing/create')
});

router.post('/create', async (req, res) => {
    await housingService.create({ ...req.body, owner: req.user._id });

    res.redirect('/')
});

router.get('/:housingId/details', async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);

    let isOwner = housing.owner === req.user?._id;

    res.render('housing/details', { ...housing,isOwner })
})

module.exports = router;
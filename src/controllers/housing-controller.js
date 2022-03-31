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
    
    let housingData = await housing.toObject();
    
    let isOwner = housingData.owner == req.user?._id;

    let tenants = housing.getTenants();

    let isAvailable = housing.availablePieces > 0;

    let isRented= housing.tenants.some(x => x._id === req.user._id);

    res.render('housing/details', { ...housingData, isOwner, tenants, isAvailable, isRented })
})

router.get('/:housingId/rent', async (req, res)=>{ 
    let housing = await housingService.getOne(req.params.housingId);

    housing.tenants.push(req.user._id);

    await housing.save();
    
    res.redirect(`/housing/${req.params.housingId}/details`);
})

module.exports = router;
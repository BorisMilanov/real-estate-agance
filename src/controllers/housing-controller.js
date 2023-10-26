const router = require('express').Router();

const { default: mongoose } = require('mongoose');
const { isAuth } = require('../middlewares/auth-middleware');
const housingService = require('../services/housing-service');

router.get('/aprt-for-recent', async (req, res) => {
    let housings = await housingService.getAll();
    res.render('housing/aprt-for-recent', { housings });
});

router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        await housingService.create({ ...req.body, owner: req.user._id });

        res.redirect('/housing/aprt-for-recent');
    } catch (error) {
        res.render('housing/create', { error: getErrorMessage(error) });
    }

});

function getErrorMessage(error) {
    let errorNames = Object.keys(error.errors);

    if (errorNames.length > 0) {
        return error.errors[errorNames[0]];
    } else {
        return error.message;
    }
}

router.get('/:housingId/details', async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);

    let housingData = await housing.toObject();

    
    let isOwner = housingData.owner === req.user?._id;

    let tenants = housing.getTenants();

    let isAvailable = housing.availablePieces > 0;

    let isRented = housing.tenants.some(x => x._id === req.user?._id);
    res.render('housing/details', { ...housingData, isOwner, tenants, isAvailable, isRented })
});

async function isOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);

    if (housing.owner == req.user._id) {
        res.redirect(`/${req.params.housingId}/details`);
    } else {
        next();
    }
}

async function isntOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);

    if (housing.owner != req.user._id) {
        next();
    } else {
        res.redirect(`/housing/${req.params.housingId}/details`);
    }
}

// router.get('/:housingId/rent',isntOwner, async (req, res) => {
//     let housing = await housingService.getOne(req.params.housingId);

//     housing.tenants.push(req.user._id);

//     await housing.save();

//     res.redirect(`/housing/${req.params.housingId}/details`);
// });

// router.get('/:housingId/delete', isOwner, async (req, res) => {
//     await housingService.delete(req.params.housingId);

//     res.redirect('/housing');
// });

router.get('/:housingId/edit', isAuth, async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);

    res.render('housing/edit', { ...housing.toObject() });
});

router.post('/:housingId/edit', isAuth, async (req, res) => {
    await housingService.updateOne(req.params.housingId, req.body);

    res.redirect(`/housing/${req.params.housingId}/details`);
})

module.exports = router;
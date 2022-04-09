const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-conttroler');
const housingController = require('./controllers/housing-controller');

router.use(homeController);
router.use('/auth', authController);
router.use('/housing', housingController);
router.use('*',(req, res)=> {
    res.render('404');
});

module.exports = router;
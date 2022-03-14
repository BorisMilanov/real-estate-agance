const router = require('express').Router();
const {register} = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    let {name, username, password, rePassword} = req.body;
    if(password !== rePassword){
        res.locals.error = 'Password missmatch';
        return res.render('auth/register');
    }

    await register({name, username, password,});
    res.redirect('/');
});

module.exports = router;
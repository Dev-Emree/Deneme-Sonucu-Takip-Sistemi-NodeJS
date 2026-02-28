let router = require("express").Router(),
    passport = require("passport"),
    { Error } = require('mongoose'),
    User = require("../models/User"),
    loginHandler = require('../controllers/loginHandler'),
    { processExam, processYDT } = require('../controllers/processExam'),
    { cookieOptions } = require('../config/config');

router.get('/giris', loginHandler.checkLoggedOut, (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    
    if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string') return res.send({ usr: 0, pass: 0 });

    passport.authenticate('local', (error, user) => {
        if (error && !app.locals.isProduction) return res.status(500).json(error);
        
        if (!user) return res.send({ usr: 0, pass: 0 });
        
        req.login(user, function (err) {
            console.log(err);
            if (err) return res.send({ usr: 1, pass: 0 });
            
            else {
                return res.cookie('LOGIN_INFO', user.username, cookieOptions).send({ usr: 1, pass: 1 });
            };
        });
    })(req, res, next);
});

router.get('/kayit-ol', loginHandler.checkLoggedOut, (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    if (typeof req.body.usr != 'string') return res.send({ usr: 0, pass: 1, email: 1 });
    if (typeof req.body.email != 'string') return res.send({ usr: 1, pass: 1, email: 0 });
    if (typeof req.body.pass != 'string') return res.send({ usr: 1, pass: 0, email: 1 });
    
    if (req.body.usr.length > 18) return res.send({ usr: 0, pass: 1, email: 1 });
    
    if (await User.findOne({ email: req.body.email })) {
        await res.send({ usr: 1, pass: 1, email: 0 });
        return;
    }
    if (await User.findOne({ username: req.body.usr })) {
        await res.send({ email: 1, pass: 1, usr: 0 });
        return;
    }

    const newUser = new User();

    newUser.username = req.body.usr;
    newUser.email = req.body.email;
    var passw = req.body.pass;
    newUser.setPassword(passw.toString());

    newUser.save()
        .then(() => {
            res.send({ usr: 1, pass: 1, email: 1 })
        }).catch(err => {
            console.log(err)
            switch (err) {
                case Error.OverwriteModelError:
                    res.send({ usr: 0, pass: 1, email: 1 });
                    break;
                default:
                    res.send({ usr: 0, pass: 0, email: 0 });
                    break;
            }
        })

});

router.route('/logout')
    .get((req, res, next) => {
        loginHandler.LogOut(req, res, next);
    })
    .post((req, res, next) => {
        loginHandler.LogOut(req, res, next);
    });

module.exports = router;
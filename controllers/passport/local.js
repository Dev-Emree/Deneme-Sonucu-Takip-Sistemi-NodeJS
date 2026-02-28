let passport = require('passport'),
    User = require('../../models/User');

module.exports = function (passport) {
    var LocalStrategy = require('passport-local');
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, function (username, password, done) {
        User.findOne({ username }, (err, user) => {
            if (err) return done(err, false);

            if (!user || !user.validPassword(password)) return done(null, false);

            return done(null, user)
        });
    }
    ));


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((_id, done) =>
        User.findById(_id, '-tyts -ayts -ydts', (err, user) =>
            done(err, user)));
}
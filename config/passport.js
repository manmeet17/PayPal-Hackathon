var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            process.nextTick(function () {
                User.findOne({ 'email': email }, function (err, user) {
                    if (err) return done(err);

                    if (!user) {
                        return done(null, false, { message: "No user found" });
                    }

                    if (!user.checkPassword(password))
                        return done(null, false, { message: "Password is Incorrect" });

                    return done(null, user);
                });
            });
        }
    ));
}
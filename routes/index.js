var express = require('express');
var User = require('../models/users');

/* GET home page. */

module.exports = function (app, passport) {
  app.post('/auth/signup', (req, res) => {
    const { email, password, name, admin } = req.body;
    User.findOne({ email }, (err, user) => {
      if (user) {
        console.log("Exists");
        return res.json({
          status: 400,
          error: `User already registered with ${email}`
        });
      }

      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.hashPassword(password);
      newUser.name = name;
      newUser.save((err, user) => {
        if (err) return res.json(err);
        return res.json(user);
      });
    });
  });

  app.post('/auth/login', passport.authenticate('local-login', { session: true }),
    function (req, res) {
      console.log("User is logged in: ", req.user);
      res.json({
        user: req.user
      });
    }
  );

  app.get('/user', (req, res) => {
    if (req.user) {
      res.json({
        status: 200,
        info: req.user
      });
    }
    else {
      res.json({
        status: 400,
        info: "No user found"
      });
    }
  });

  // app.get('/',(req,res)=>{
  //   res.json({
  //     msg: "Page"
  //   });
  // });

  app.post('/auth/logout', (req, res) => {
    if (req.user) {
      req.logout();
      res.json({ msg: "Logging out user" });
    }
    else {
      console.log("No user found");
    }
  });

}

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}


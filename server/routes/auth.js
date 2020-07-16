const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/Users');

router.post('/register_login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (!user) {
      return res.status(400).json({ error: 'No user found' });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ result: 'success' });
    });
  })(req, res, next);
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.session.passport.user;
    User.findOne({ _id: userId })
      .then(user => {
        if (!user) {
          return res.json({ error: 'Could not find user' });
        } else {
          return res.json(user);
        }
      })
      .catch(err => {
        return res.json({ error: 'Error while accessing database' });
      });
  } else {
    return res.json({ result: 'Must be authenticated' });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ result: 'success' });
});

module.exports = router;

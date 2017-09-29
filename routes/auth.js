

const router = require('express').Router();
const User = require('../models/user');
const bodyParser = require('body-parser');
const passport = require('passport');

router.get('/login', (req, res) =>{
  const flashMessages = res.locals.getMessages();
  console.log('flash messages', flashMessages);

  if(flashMessages.err){
    res.render('login', {
      showErrors : true,
      errors : flashMessages.err
    })
  } else {

  res.render('login');
  }
})

router.post('/login', (passport.authenticate('local', {
  successRedirect : '/home',
  failureRedirect : '/login',
  failureFlash: true
})));



router.get('/register', (req, res, next) =>{
  const flashMessages = res.locals.getMessages();
  console.log('flash messages', flashMessages);

  if (flashMessages.err) {
    res.render('register', {
      showErrors: true,
      errors: flashMessages.err
    })
  }
  else {
    res.render('register');
  }
})




router.post('/register', (req, res, next) => {

  req.checkBody('username', 'Username  required').notEmpty();
  req.checkBody('password', 'Password  required').notEmpty();

  req.getValidationResult()
    .then(function(result){
      if (result.isEmpty() === false) {
        result.array().forEach((err) => {
          req.flash('error', err.msg);
        })
        console.log('redirecting to register');
        res.redirect('/register');
      }
      else {
        console.log('hi', req.body);
        const user = new User ({ username : req.body.username, password : req.body.password});
        user.save((err) => {
          if (err) {
            if (err.message.indexOf('duplicate error') > -1){
              req.flash('Username already in use');
            } else {
              req.flash('there was a problem.');
            }
            console.log('redirecting to reg on post');
            res.redirect('/register');
          } else {
            console.log('hey I am here!');
            next()


        }
      });
    }
    })
  }, passport.authenticate('local', {
    successRedirect : '/home',
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
})

module.exports = router;

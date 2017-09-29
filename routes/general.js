const router = require('express').Router();


router.get('/', (req, res) => {
  res.render('index');
});

function authRequired(req, res, next){
  if(req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/home', authRequired, (req, res) => {
  console.log("user:", req.user)
  res.render('home', {
    username: req.user.username
  })
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/search', function (req, res) {
  res.render('search');
});

router.get('/create', function (req, res) {
  res.render('create');
});


module.exports = router;

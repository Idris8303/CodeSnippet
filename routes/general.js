const router = require('express').Router();
const Snippet = require('../models/snippet');

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

router.post('/search', (req, res) => {

    let searchBy = req.params.searchBy;
    let searchTerm = req.params.searchTerm;
    let object = {};
    if (searchBy && searchTerm) {
      object[searchBy] = searchTerm;
    }
  Snippet.find(object, (err, snippets) => {
    if(err) {
      req.flash('Sorry.There was a problem saving.');
    } else {

      console.log(snippets);
    res.render('search',{searchResults: snippets})
    }
  })
});


router.get('/create', function (req, res) {
  res.render('create');
});
router.post('/create', (req, res) => {
  const snippet = new Snippet ({
    //possibly using underscore and adding id here//
    title: req.body.title,
    codeBody: req.body.codeBody,
    language: req.body.language,
    notes: req.body.notes,
    tag: req.body.tag
  });
  console.log('create a snippet!',req.body.title);
  snippet.save((err) => {
    if(err) {
      req.flash('Sorry.There was a problem saving.');
    }
  });
  res.redirect('create');
});

router.get('/snippets', (req, res) => {
  console.log(req.user);
  Snippet
    .find({})
    .then((codeSnippets) => {
      res.render('snippets', {
        codeSnippets
      });
    });
});


module.exports = router;

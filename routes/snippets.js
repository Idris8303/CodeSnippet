const router = require('express').Router();
const bodyParser = require('body-parser');
const Snippet = require('../models/snippet');


router.post('/create', (req, res) => {
  const snippet = new Snippet ({
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
  res.redirect('mySnippets');
});


router.get('/search/:searchBy?/:searchTerm?', (req, res) => {

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
      let data = {snippets};
      console.log(data);
    res.render('mySnippets', data)
    }
  })
});

router.post('/search/:searchBy?/:searchTerm?', (req, res) => {

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
      let data = {snippets};
      console.log(data);
    res.render('mySnippets', data)
    }
  })
});

router.get('/create', (req, res) => {
  res.render('create');
});



module.exports = router;

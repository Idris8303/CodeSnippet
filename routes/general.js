const router = require('express').Router();
const bodyParser = require('body-parser');
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

router.get('/searchSnippets/:searchBy?/:searchTerm?', (req, res) => {
    let searchBy = req.params.searchBy;
    let searchTerm = req.params.searchTerm;
    let object = {};
    if (searchBy && searchTerm) {
      object[searchBy] = searchTerm;
    }
  Snippet.find(object, (err, snippets) => {
    if(err) {
      req.flash('Sorry.There was a problem saving your snippet.');
    } else {
      let data = {snippets};

      console.log(data);
    res.render('snippets',data)
    }
  })
});
router.post('/searchSnippetsBy/:searchBy?/:searchTerm?', (req, res) => {

    let searchBy = req.params.searchBy;
    let searchTerm = req.params.searchTerm;
    let object = {};
    if (searchBy && searchTerm) {
      object[searchBy] = searchTerm;
    }
  Snippet.find(object, (err, snippets) => {
    if(err) {
      req.flash('there was a problem in saving your snippet.');
    } else {
      let data = {snippets};
      console.log(data);
    res.render('snippets', data)
    }
  })
});


router.get('/create', function (req, res) {
  res.render('create');
});
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
  res.redirect('create');
});
//   app.get('/snippets/:snippetId',function(req,res){
// })

// app.get('/snippets/:snippetId', function (req, res) {
//   // create snippet mustache template
//   // get the snppet with id == snippetId
//   // and render it in the snippet mustache template
//   res.send(req.params.snippetId)
// })

// router.get('/snippets/', (req, res) => {
//   console.log(req.user);
//   Snippet
//     .find({})
//     .then((codeSnippets) => {
//       res.render('snippets', {
//         codeSnippets
//       });
//     });
// });
router.get('/findASnippetbyTitle', (req, res) => {
let findByTitle = Snippet.find(findSnippetByTitle, searchQuery);
 console.log(JSON.stringify(findByTitle));

function findSnippetByTitle (findByTitle) {
  if (`findByTitle.${searchQuery}` === `req.body.${searchQuery}`) {
    let returnedSnippet = {snippets};
    res.render('snippets', returnedSnippet);
  }
  }
})


module.exports = router;

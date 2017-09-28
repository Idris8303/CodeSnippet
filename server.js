const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash-messages');
const expressValidator = require('express-validator');




mongoose.Promise = global.Promise;

const app = express();

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended : false }));
app.use(expressValidator());


app.use(session({
  secret : 'Aflabajabawikiwoo!',
  resave : false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./passportConfig').configure(passport);

const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');

app.use(require('./routes/general'));
app.use(require('./routes/auth'))


let url = 'mongodb://localhost:27017/CodeSnipet';

mongoose.connect(url, { useMongoClient: true }).then(function(){console.log("Yay!")});


app.listen(3003, function(){
  console.log('listening on port 3003');
})

const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

function configure(passport) {
  console.log(passport)
  const strategyFunc = function(username, password, done) {
    User.authenticate(username, password, function(err, user){
      if(err) {
      console.log('Houston! We have an error in passport config', err);
      done(err);
    } else if (user) {
      console.log('We have a User!');
      done(null,user);
    } else {
      console.log('There was like, no user or whatever')
      done(null, false, {
        message: ' OMG! Wrong username or password Bruh!'
      });
      }
    })
  };


  passport.use(new LocalStrategy(strategyFunc));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })
};

module.exports = {
  configure
};

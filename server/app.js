/**
 * Created by Skyler DeGrote on 8/19/15.
 */

var express = require("express");
var path = require("path");
var index = require("./routes/index.js");
var app = express();
var passport = require("passport");
var session = require("express-session");
var localStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
var User = require('./models/user');
var register = require('./routes/register');



app.set("port", (process.env.PORT || 5000));

// The most widely used way for websites to authenticate users is via a username and password.
// Support for this mechanism is provided by the “passport-local” module.

app.use(session({
   secret: "secret",
   key:"user",
   resave: true,
   s: false,
   cookie:{maxAge:60000, secure:false}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/register', register);


//The verify callback for local authentication accepts username and password arguments,
// which are submitted to the application via a login form. Inside this form we’ll authenticate users.
app.use("local", new localStrategy({
   passReqToCallback: true,
   usernameField: "username"
},
    function(req, username, password, done){

    }));

//mongo setup
var mongoURI = "mongodb://localhost:27017/prime_example_passport";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
   console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
   console.log('mongodb connection open');
});

passport.serializeUser(function(user, done) {
   done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   User.findById(id, function(err,user){
      if(err) done(err);
      done(null,user);
   });
});

passport.use('local', new localStrategy({
       passReqToCallback : true,
       usernameField: 'username'
    },
    function(req, username, password, done){
       User.findOne({ username: username }, function(err, user) {
          if (err) throw err;
          if (!user)
             return done(null, false, {message: 'Incorrect username and password.'});

          // test a matching password
          user.comparePassword(password, function(err, isMatch) {
             if (err) throw err;
             if(isMatch)
                return done(null, user);
             else
                done(null, false, { message: 'Incorrect username and password.' });
          });
       });
    }));

app.use("/", index);

//the wild card/ (always has to be last)

app.listen(app.get("port"), function(){
   console.log("Listening to port: "+app.get("port"));
});


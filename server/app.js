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
var bodyParser = require('body-parser');
var mongoURI = 'mongodb://localhost:27017/passport_authentication';
var mongoDB = mongoose.connect(mongoURI).connection;


//Setting up Mongo communication
mongoDB.on('error', function(err){
    if(err){
        console.log("Mongo Error: ", err);
    }
});

mongoDB.once('open', function(){
    console.log("Connected To MongoDB");
});

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));

//setting the port
app.set("port", (process.env.PORT || 5000));

//passport
app.use(session({
    secret:"secret",
    key:"user",
    resave:true,
    s:false,
    cookie:{maxAge:60000, secure:false}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err) done(err);
        done(null, user);
    });
});

passport.use('local', new localStrategy({
        passReqToCallback : true,
        usernameField : 'username'},
    function(req, username, password, done){
        User.findOne({username: username}, function(err, user){
            if(err) throw err;
            if(!user) return done(null, false, {message: 'Incorrect username and password.'});
            user.comparePassword(password, function(err, isMatch){
                if(err) throw err;
                if(isMatch) return done(null, user);
                else done(null, false, {message: 'Incorrect username and password.'});
            });
        });
    }
));


//routing
app.use("/register", register);

app.use("/", index);
app.listen(app.get("port"), function(){
    console.log("Listening to port: "+app.get("port"));
});

module.exports = app;


















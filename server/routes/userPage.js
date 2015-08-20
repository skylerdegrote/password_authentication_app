/**
 * Created by Skyler DeGrote on 8/19/15.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get("/", function(req,res,next){
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: "/assets/views/users.html",
        failureRedirect: '/'
    })
);


router.get('/', function(req, res, next) {
    res.json(req.isAuthenticated());
});

module.exports = router;

/**
 * Created by Skyler DeGrote on 8/19/15.
 */


var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

router.post('/', function(req,res,next) {
    Users.create(req.body, function (err, post) {
        if (err)
            next("That user already exists");
        else
            res.redirect('/views/users.html');
    })
});

module.exports = router;



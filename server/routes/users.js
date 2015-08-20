/**
 * Created by Skyler DeGrote on 8/19/15.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json(req.isAuthenticated());
});

module.exports = router;
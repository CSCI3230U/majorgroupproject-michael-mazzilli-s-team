var express = require('express');
var router = express.Router();
var md = require('markdown-it')();

var fs = require('fs');

//display documentation at this route
router.get('/', (req, res) => {
    var string = fs.readFileSync('./README.md').toString();
    res.send(md.render(string));
});

module.exports = router;
var express = require('express');
var router = express.Router();
var md = require('markdown-it')('default');
var fs = require('fs');

router.get('/', (req, res) => {
    var string = fs.readFileSync('./README.md').toString();
    res.send(md.render(string));
});

module.exports = router;
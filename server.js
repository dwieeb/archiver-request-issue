var express = require('express');
var multer = require('multer');
var upload = multer();

var app = express();

app.post('/', upload.single('file'), function(req, res) {
    console.log(req.file);
    res.send('ok');
});

app.listen(3000, function() {
    console.log('running on 3000');
});

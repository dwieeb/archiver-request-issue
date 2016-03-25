var fs = require('fs');
var archiver = require('archiver');
var request = require('request');

// OPTION 1: archiver (Unexpected end of multipart data)
var z1 = archiver('zip');

z1.on('error', function(err) {
  console.log("ERROR", err.stack);
});

z1.append('HELLO THERE, CAPTAIN', { name: 'capngreet.txt' });
z1.finalize();

// OPTION 2: read stream (works)
// var z1 = fs.createReadStream('./capngreet.zip');

var formData = {
  file: {
    value: z1,
    options: {
      filename: 'capngreet.zip',
      contentType: 'application/zip'
    }
  }
};

request.post({
  url: 'http://localhost:3000',
  formData: formData
}, function(err, resp, body) {
  if (err) throw err;
  console.log(body);
});

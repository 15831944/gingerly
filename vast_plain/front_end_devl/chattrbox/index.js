var http = require('http');
var fs = require('fs');
//var path = require('path');
var extract = require('./extract');
var wss = require('./websockets-server')

var handleError = function (err, res) {
  res.writeHead(404);
  res.end();
}

var server = http.createServer(function (req, res) {
  console.log("responding to a request");
  var filePath = extract(req.url)
  console.log(filePath);

  fs.readFile(filePath, function (err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
        res.end(data);
    }

  })

});
console.log('web server listening port 3000')
server.listen(3000);

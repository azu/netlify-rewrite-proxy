var express = require('express');
var app = express();
require('now-logs')('netlify-rewrite-proxy-ddxfwwgnff')
// respond with "hello world" when a GET request is made to the homepage
app.get('/*', function(req, res) {
  console.log(req);
  console.log(res);
  res.send('hello world');
});


app.listen();
var express = require('express');
var app = express();

var newBaseURL = process.env.NEW_BASE_URL || 'http://example.com';
var redirectStatus = parseInt(process.env.REDIRECT_STATUS || 308);
var maxAge = parseInt(process.env.CACHE_CONTROL_MAX_AGE) || 31556926;
var port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.setHeader('cache-control', 'max-age=' + maxAge)
  next();
});

app.all('*', function(request, response) {
  response.redirect(redirectStatus, newBaseURL + request.url);
});

app.listen(port, function() {
  console.log("Listening on " + port);
});
console.log('Start me up, Bruce');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var chores = require('./routes/index.js');
var port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true})); // this creates req.body

app.use('/chores', chores);

app.listen(port, function() {
  console.log('listening on port ', port);
});

var config = require('./config.js');

var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
});

app.get('/status', function (req, res) {
  res.send('Running...')
});

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage')
});
  
  // POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
});

app.listen(config.port, () => console.log(`App running on ${config.port}`))
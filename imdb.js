// Import the fs module so that we can read in files.
var fs = require('fs');
// Import express to create and configure the HTTP server.
var express = require('express');

// Read in the text file and parse it for JSON.
var data = JSON.parse(fs.readFileSync('ratings.json','utf8'));

// Create a HTTP server app.
var app = express();

// When a user goes to /, return a small help string.
app.get('/', function(req, res) {
  res.send('Try http://127.0.0.1:8000/movie/id/123 or http://127.0.0.1:8000/movie/year/1900.');
});

// Send back the JSON for movie i at /movie/id/i.
app.get('/movie/id/:id', function(req, res) {
  res.json(data[req.params.id]);
});

app.get('/movie/random', function(req, res){
  if(req.query.nomovies == null){
    res.json(data[Math.floor(Math.random() * data.length)]);
  }
  else {
    var randommovies = [];

    for(i = 0; i < req.query.nomovies; i++){
      randommovies.push(data[Math.floor(Math.random() * data.length)]);
    }

    res.json(randommovies);
  }
});

app.get('/movie/search/:term', function(req, res){
  var results = [];
  data.forEach(function(entry){
    if(entry.title.search(req.params.term) != -1){
      results.push(entry);
    }
  });

  res.json(results);
});


// Start the server.
var server = app.listen(8000);

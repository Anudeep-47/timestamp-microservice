// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionsSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});


app.get("/api/:date?", function (req, res) {
  try {
    let d = req.params.date || '';
    if (d.length === 0) {
      d = new Date();
    } else {
      if (!isNaN(+d)) d = parseInt(d);
      d = new Date(d);
      if (d instanceof Date && isNaN(d)) throw 'Invalid Date';
    }
    res.json({
      'unix': d.getTime(),
      'utc': d.toUTCString()
    });
  } catch (error) {
    res.json({
      error
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
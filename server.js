// Densecap and Node to p5 Example
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/node-densecap
// https://github.com/shiffman/A2Z-F17

// Using express: http://expressjs.com/
const express = require('express');

// Create the app
const app = express();

// Require child_process for triggering script for Processing
const exec = require('child_process').exec;

// For reading image files
const fs = require('fs');


// "body parser" is need to deal with post requests
const bodyParser = require('body-parser');

// Support JSON bodies
app.use(bodyParser.json({
  limit: '50mb'  // Because we have images
}));

// Support encoded bodies
app.use(bodyParser.urlencoded({
  limit: '50mb', // Because we have images
  extended: true
})); 

// This is for hosting files
app.use(express.static('public'));

// Set up the server
var server = app.listen(3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}


// This is a post receiving an image and returning captions
app.post('/densecap', densecap);


function densecap(request, response) {
  // Grab the base64 content
  let image = request.body.base64;
  // Strip out the headers
  let base64data = image.replace('data:image/png;base64,', '');

  // Write it to a file
  // We have to do this for densecap to read it
  fs.writeFile('image.png', base64data, {
    encoding: 'base64'
  }, (err) => {
    // If there was a problem writing the file
    if (err) throw err;
    console.log('Saved');

    // Execute the densecap command
    var cmd = 'th run_model.lua -input_image image.png -gpu -1 -output_vis_dir results';
    exec(cmd, (error, stdout, stderr) => {
      // Checking for errors
      if (error) {
        console.log(error);
      }
      if (stderr) {
        console.log(stderr);
      }
      // This is when it's finished
      if (stdout) {
        console.log(stdout);
        // Read the JSON results
        var output = fs.readFileSync('results/results.json');
        var results = JSON.parse(output);
        // Send them back!
        response.send(results);
      }
    });
  });
}

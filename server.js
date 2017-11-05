// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Require child_process for triggering script for Processing
var exec = require('child_process').exec;

// For reading image files
var fs = require('fs');

// "body parser" is need to deal with post requests
var bodyParser = require('body-parser');
app.use(bodyParser.json({
  // For large files
  limit: '10mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

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




function cleanup(base64) {
  var matches = base64.match(/^data:.*?;base64,(.+)$/);
  return matches[1];
}

// This is a post for training
app.post('/densecap', densecap);


function densecap(request, response) {
  let image = request.body.base64;
  let base64data = image.replace('data:image/png;base64,', '');
  fs.writeFile('image.png', base64data, {
    encoding: 'base64'
  }, (err) => {
    if (err) throw err;
    console.log('Saved');
    var cmd = 'th run_model.lua -input_image image.png -gpu -1 -output_vis_dir results';
    exec(cmd, processing);

    // Callback for command line process
    function processing(error, stdout, stderr) {
      if (error) {
        console.log(error);
      }
      if (stderr) {
        console.log(stderr);
      }

      if (stdout) {
        console.log(stdout);
        var output = fs.readFileSync('results/results.json');
        var results = JSON.parse(output);
        response.send(results);
      }
    }
  });
}

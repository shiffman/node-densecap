// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F17

//let img;
// let data;

// function preload() {
//   img = loadImage('images/elephant.jpg');
//   // data = loadJSON('results.json');
// }

function setup() {
  var canvas = createCanvas(710, 400);
  background(0);
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Drag an image file onto the canvas.', width / 2, height / 2);
  canvas.drop(gotFile);
  colorMode(HSB, 360, 100, 100, 100);

  function gotFile(file) {
    // If it's an image file
    if (file.type === 'image') {
      // Create an image DOM element but don't show it
      var img = createImg(file.data, imageReady);
      // Draw the image onto the canvas

      function imageReady() {
        background(0);
        img.hide();
        image(img, 0, 0);
        let data = {
          base64: canvas.elt.toDataURL()
        }
        httpPost('/densecap', data, gotData, error);

        function gotData(data) {
          data = JSON.parse(data);
          //console.log(data);
          var results = data.results[0];
          var num = min(5, results.captions.length);
          for (let i = 0; i < num; i++) {
            let col = color(i * (360 / num), 100, 100);
            let colA = color(i * (360 / num), 100, 100, 10);
            let bx = results.boxes[i];
            stroke(col);
            fill(colA);
            strokeWeight(1);
            rectMode(CORNER);
            rect(bx[0], bx[1], bx[2], bx[3]);

            fill(col);
            noStroke();
            textAlign(CENTER);
            text(results.captions[i], bx[0] + bx[2] / 2, bx[1] + bx[3] - 12);
          }
        }
      }
    }
  }
}



function error(result) {
  console.log('error');
  console.log(JSON.parse(result));
}

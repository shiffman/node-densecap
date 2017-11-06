// Densecap and Node to p5 Example
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/node-densecap
// https://github.com/shiffman/A2Z-F17

// Instructions to user
function instructions() {
  background(0);
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Drag an image file onto the canvas.', width / 2, height / 2);
}

function setup() {
  // Create a canvas
  let canvas = createCanvas(710, 400);
    
  // Draw instructions
  instructions();

  // HSB Mode
  colorMode(HSB, 360, 100, 100, 100);


  // If the user drags a file over the canvas
  canvas.drop((file) => {

    // If it's an image file
    if (file.type === 'image') {

      // Create an image DOM element
      let img = createImg(file.data, () => {
        // hide the DOM element and draw it
        img.hide();
        background(0);
        image(img, 0, 0);
        // Get the base 64 encoding
        let data = {
          base64: canvas.elt.toDataURL()
        }

        // Post the base64 image to the server 
        httpPost('/densecap', data, gotData, error);

        // Got the result
        function gotData(data) {
          // Turn it into JSON
          data = JSON.parse(data);

          // All the captions stuff is here
          let results = data.results[0];

          // Show up to 5 captions
          let num = min(5, results.captions.length);
          for (let i = 0; i < num; i++) {
            // Pick a different hue
            let col = color(i * (360 / num), 100, 100);
            let colA = color(i * (360 / num), 100, 100, 10);
            // Get the box info
            let bx = results.boxes[i];
            
            // Draw the box
            stroke(col);
            fill(colA);
            strokeWeight(1);
            rectMode(CORNER);
            rect(bx[0], bx[1], bx[2], bx[3]);

            // Draw the text
            noStroke();
            fill(col);
            textAlign(CENTER);
            text(results.captions[i], bx[0] + bx[2] / 2, bx[1] + bx[3] - 12);
          }
        }
      });
    }
  });
}



function error(result) {
  console.log('error');
  console.log(JSON.parse(result));
}

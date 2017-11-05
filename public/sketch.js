// A2Z F17
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F17


let img;

function preload() {
  img = loadImage('images/elephant.jpg');
}

function setup() {
  noCanvas();
  let data = {
    base64: img.canvas.toDataURL()
  }
  httpPost('/densecap', data, gotData, error);
  function gotData(data) {
    console.log(data);
  }
}




function error(result) {
  console.log('error');
  console.log(JSON.parse(result));
}

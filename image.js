var fs = require('fs');
let image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAPklEQVQYVwEzAMz/AZGMif/s7OwADg4OAO7u7QABhH98/+3t7QAPDw8A8PDvAAG4sK7/6urqAAsLCwDs7OsAlicZWCD6XScAAAAASUVORK5CYII=";
let base64data = image.replace('data:image/png;base64,', '');
fs.writeFile('image.png', base64data, { encoding: 'base64' }, (err) => {
  if (err) throw err;
  console.log('Saved');
});

var Imgbed = require('imgbed');

// the canvas element
var canvas = document.getElementById('canvas');
// the canvas's context that we use for drawing and getting image data
var ctx    = canvas.getContext('2d');

// the text area
var textarea = document.getElementById('textarea');
// file link
var fileLink = document.getElementById('file-link');

// Imgbed instance of the of current image
var ib;

// handle the uploading of files
//
// get the element and attach the listener
var inputElement = document.getElementById("file-upload");
inputElement.addEventListener("change", handleFiles);
function handleFiles() {
  // turn the uploaded file into a data url
  var src = URL.createObjectURL(this.files[this.files.length - 1]);
  // load the new image into the canvas
  loadImage(src);
}

// handle the downloading of files
// @todo

// handle clear button press
// var clearButton = document.getElementById('clear');
// clearButton.onclick = function () {
//   ib.clear();
//   writeImage(ctx, ib);
//   textarea.value = ib.toString().split("\0").shift();
// }

// handle save button press
var saveButton = document.getElementById('save');
saveButton.onclick = function () {
  ib.clear();
  ib.write(textarea.value);
  writeImage(ctx, ib);
  fileLink.setAttribute('href', canvas.toDataURL());
  fileLink.click();
}

var fileName = document.getElementById('file-name');
fileName.addEventListener('change', function (event) {
  fileLink.setAttribute('download', this.value);
});

// handle save button press
// var downloadButton = document.getElementById('download');
// downloadButton.onclick = function () {
//   fileLink.setAttribute('href', canvas.toDataURL());
//   fileLink.click();
// }

// getImage
//
// load the given url, either a URI or data-url, into an
// Image element and callback with it
// `url` - String - URI or data-url of the image
// `callback` - Function, optional - callback(<error>, <Image element>)
function getImage (url, callback) {
  callback = callback || function () {};
  var img = new Image();
  img.src = url;
  img.onload = function () {
    callback(null, img);
  };
}

// loadImage
//
// takes an image, draws it on the canvas and creates a new Imgbed instance
// `img` - String - URI or data-url of the image
// `callback` - Function, optional - callback(<error>, <Image element>, <Imgbed instance>)
function loadImage (img, callback) {
  callback = callback || function () {};
  if (typeof img === 'string') {
    // get the image
    getImage(img, function (error, img) {
      // draw the Image
      canvas.width  = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // create the new Imgbed
      ib = new Imgbed(ctx.getImageData(0, 0, canvas.width, canvas.height).data);

      // get the string and display it
      textarea.value = ib.toString().split("\0").shift();

      callback(null, img, ib);
    });
  }
}

function writeImage (ctx, ib) {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  imageData.data.set(ib._buffer);
  // ib.copy(imageData.data);
  // for (var i = 0; i < imageData.data.length; i++) {
    // imageData.data[i] = ib._buffer[i];
  // }

  ctx.putImageData(imageData, 0, 0);
}

// var imageData;
// var data;
//
// function draw () {
//   ctx.beginPath();
//   ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
//   ctx.moveTo(110,75);
//   ctx.arc(75,75,35,0,Math.PI,false);   // Mouth (clockwise)
//   ctx.moveTo(65,65);
//   ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
//   ctx.moveTo(95,65);
//   ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
//   ctx.stroke();
//
//   canvas    = document.getElementById('canvas');
//   ctx       = canvas.getContext('2d');
// }

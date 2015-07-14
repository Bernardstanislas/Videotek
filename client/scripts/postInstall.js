var fs = require('fs');
var vendor = './vendor/';

var files = [
  'react/dist/react.js'
];


var fonts = [];


//Copy dependencies (js / css)
files.map(function(path){
  var splitedPath = path.split('/');
  var pth = splitedPath[splitedPath.length - 1];
  console.log(splitedPath, pth);
  fs.createReadStream('../node_modules/' + path)
    .pipe(
      fs.createWriteStream(vendor + pth)
    );
});


//Copy assets (fonts, images)
fonts.map(function(path){
  var splitedPath = path.split('/');
  var pth = splitedPath[splitedPath.length - 1];
  console.log(splitedPath, pth);
  fs.createReadStream('../node_modules/' + path)
    .pipe(
      fs.createWriteStream('./app/assets/fonts/' + pth)
    );
});

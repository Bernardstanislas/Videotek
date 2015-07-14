var fs = require('fs');
var vendor = __dirname + '/../vendor/';
var nodeModules = __dirname + '/../../node_modules/';
var fontsDir = __dirname + '../app/assets/fonts/';

var files = [
  'react/dist/react.js'
];

var fonts = [];

//Copy dependencies (js / css)
files.map(function(path){
  var splitedPath = path.split('/');
  var pth = splitedPath[splitedPath.length - 1];
  fs.createReadStream(nodeModules + path)
    .pipe(
      fs.createWriteStream(vendor + pth)
    );
});

//Copy assets (fonts, images)
fonts.map(function(path){
  var splitedPath = path.split('/');
  var pth = splitedPath[splitedPath.length - 1];
  fs.createReadStream(nodeModules + path)
    .pipe(
      fs.createWriteStream(fontsDir + pth)
    );
});

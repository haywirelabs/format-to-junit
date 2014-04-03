//main.js

/*
Initialize Vars
 */
  var fs = require('fs');
  var split = require('split');
  var projectName = 'format-to-junit';

/*
Main
*/

(function(){

  /*
  Read in file to format
   */

  var fileToFormat = 'input/jshint.txt';

  fs.createReadStream(fileToFormat)
    .pipe(split())
    .on('data', function (line) {
      console.log("Line: " + line);
    });

}).call(this);

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
      trimmed_line = line.replace(/^\s+|\s+$/g, "");
      if(trimmed_line != ""){
        console.log("Line: " + trimmed_line);
      }
    });

}).call(this);

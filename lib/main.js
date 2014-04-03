//main.js

/*
Initialize Vars
 */
  var fs = require('fs');
  var projectName = 'format-to-junit';

/*
Main
*/

(function(){

  /*
  Read in file to format
   */

   fs.readFile('input/jshint.txt', 'utf8', function(err, data){
    if (err){
      return console.log(err);
    }
    console.log(data);
   });

}).call(this);

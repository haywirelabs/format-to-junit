//main.js

/*
Initialize Vars
 */
  var fs = require('fs');
  var split = require('split');
  var projectName = 'format-to-junit';

/*
Read in CLI arguments
 */

 var ArgumentParser = require('argparse').ArgumentParser;
  var parser = new ArgumentParser({ addHelp: true, description: 'Format to JUnit Options' });
  parser.addArgument([ '-f', '--from' ],{ help: 'Path to file to format' });
  parser.addArgument([ '-t', '--to' ], {help: 'Path to where the XML file should write'});
  var args = parser.parseArgs();

/*
Set up XML Document
 */

var docBuilder = require('xmlbuilder');
//var xml = docBuilder.create('')

console.log(xml);

/*
Main
*/

(function(){

  /*
  Read in file to format
   */

  var fileToFormat = args.from;
  var fileData = [];

  fs.createReadStream(fileToFormat)
    .pipe(split())
    .on('data', function (line) {
      trimmed_line = line.replace(/^\s+|\s+$/g, "");
      if(trimmed_line !== ""){
        fileData.push(trimmed_line);
      }
      //console.log(fileData);
    });

  //console.log(fileData);

}).call(this);

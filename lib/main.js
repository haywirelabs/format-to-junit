//main.js

/*
Initialize Vars
 */
  var fs = require('graceful-fs');
  var split = require('split');
  var xml2js = require('xml2js');
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
  var xml = docBuilder.create('testsuite', {version: '1.0', encoding: 'UTF-8'}, {errors: '0', 'tests':'0'});
  xml.att('errors', '0');
  xml.att('tests','0');
  xml.att('time','0');
  xml.att('failures', '0');
  xml.att('name', 'jsHint Results');

  var xmlProperty = xml.ele('properties')
  .att('value','Java(TM) 2 Runtime Environment, Standard Edition')
  .att('name','java.runtime.name')
    .ele('property')
    .att('value', 'UnicodeBig')
    .att('name', 'sun.io.unicode.encoding');

/*
Main
*/

(function(){

  /*
  Read in file to format
   */

  var fileToFormat = args.from;
  var fileData = [];
  var parser = new xml2js.Parser();
  var counter = 1;

  fs.createReadStream(fileToFormat)
    .pipe(split())
    .on('data', function (line) {
      trimmed_line = line.replace(/^\s+|\s+$/g, "");
      if(trimmed_line !== ""){
        fileData.push(trimmed_line);
      }

      var testCaseName = 'error' + counter;

      var xmlTestCase = xml.ele('testcase')
        .att('time', '0')
        .att('name', testCaseName)
        .ele('failure',{'type':'junit.framework.AssertionFailedError', 'message': 'JS Hint Failure'}, trimmed_line);

      xmlString = xml.end();

      var writeStream = fs.createWriteStream(args.to);
      writeStream.write(xmlString);
      writeStream.end = function(data){
        console.log('Done Writing');
      };

      counter++;

      /*
      fs.writeFile(args.to, xmlString, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('Successfully wrote the XML document');
        }
      })
      */

    });

}).call(this);

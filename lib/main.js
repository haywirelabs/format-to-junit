//main.js

/*
Initialize Vars
 */
  var fs = require('fs');
  var split = require('split');
  var projectName = 'format-to-junit';

/*
Read in CLI vars
 */

 var ArgumentParser = require('argparse').ArgumentParser;
  var parser = new ArgumentParser({ addHelp: true, description: 'Format to JUnit Options' });
  parser.addArgument([ '-f', '--from' ],{ help: 'Path to file to format' });
  parser.addArgument([ '-t', '--to' ], {help: 'Path to where the XML file should write'});
  var args = parser.parseArgs();

/*
Set up XML Document
 */

function xmlDocument(){
  var XMLWriter = require('xml-writer');
  xml_document = new XMLWriter();
  xml_document.startDocument('1.0','UTF-8');
  xml_document.startElement('testsuite')
    .writeAttribute('errors','0')
    .writeAttribute('tests','0')
    .writeAttribute('time','0')
    .writeAttribute('failures', '0')
    .writeAttribute('name','name')
    .startElement('properties')
      .startElement('property')
        .writeAttribute('value','Java(TM) 2 Runtime Environment, Standard Edition')
        .writeAttribute('name','java.runtime.name')
      .endElement()
      .startElement('property')
        .writeAttribute('value','UnicodeBig')
        .writeAttribute('name','sun.io.unicode.encoding')
      .endElement()
    .endElement()
    .startElement('testcase')
      .writeAttribute('time','0.0001')
      .writeAttribute('name','testName1')
    .endElement()
    .startElement('testcase')
      .writeAttribute('time','0')
      .writeAttribute('name','testName2')
    .endElement()
    .startElement('testcase')
      .writeAttribute('time','0.164')
      .writeAttribute('name','testName3')
      .startElement('failure')
        .writeAttribute('type','junit.framework.AssertionFailedError')
        .writeAttribute('message','Should not have any errors.')
        .text('WORDS DESCRIBING FAILED TEST')
      .endElement()
      .startElement('system-out')
        .text('PerforceSyncCommand.command: /usr/local/bin/p4')
      .endElement()
    .endElement()
  .endElement();
  xml_document.endDocument();

  fs.writeFile(args.to, xml_document, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log('Successfully wrote the XML document');
    }
  })
}

xmlDocument();

/*
Main
*/

(function(){

  /*
  Read in file to format
   */

  var fileToFormat = args.from;

  fs.createReadStream(fileToFormat)
    .pipe(split())
    .on('data', function (line) {
      trimmed_line = line.replace(/^\s+|\s+$/g, "");
      if(trimmed_line !== ""){
        //console.log("Line: " + trimmed_line);
      }
    });

}).call(this);

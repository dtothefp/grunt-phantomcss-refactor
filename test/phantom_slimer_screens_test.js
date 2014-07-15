'use strict';

var grunt     = require('grunt');
var helpers   = require('./helpers');
var fs        = require('fs');
var Screener  = require('../tasks/lib/screener.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.phantom_slimer_screens = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  constructor: function (test) {
    var cbFunction = function(){};
    var options = {
        indexPath: 'screens/',
        baseUrl: 'http://localhost:3000/',
        screenSizes: [ '450', '600', '960', '1024' ],
        files: [ 
           'test/files/index.html',
           'test/files/something.html',
           'test/files/nested/index_nested.html',
           'test/files/nested/something_nested.html' ] 
    }
    var screener = new Screener(grunt, options, cbFunction);
    test.expect(3);
    test.deepEqual(screener.callback, cbFunction);
    test.deepEqual(screener.options, options);
    test.strictEqual(screener.options.files.length, 4);

    test.done();
  },
  previousScreensGenerated: function(test) {
    var cbFunction = function(){};
    var options = {
        indexPath: 'screens/',
        baseUrl: 'http://localhost:3000/',
        screenSizes: [ '450', '600', '960', '1024' ],
        files: [ 
           'test/files/index.html',
           'test/files/something.html',
           'test/files/nested/index_nested.html',
           'test/files/nested/something_nested.html' ] 
    }
    function deleteFolderRecursive(path) {
      var files = [];
      if( fs.existsSync(path) ) {
          files = fs.readdirSync(path);
          files.forEach(function(file,index){
              var curPath = path + "/" + file;
              if(fs.lstatSync(curPath).isDirectory()) { // recurse
                  deleteFolderRecursive(curPath);
              } else { // delete file
                  fs.unlinkSync(curPath);
              }
          });
          fs.rmdirSync(path);
      }
    };
    var screener = new Screener(grunt, options, cbFunction);
    //TODO: test removing directory
    // screener.removeScreensDir('./screens');
    // test.ok(!fs.existsSync('./screens'));
    // test.ok(!screener.previousScreens);
    test.done();
  },
  makePicPaths: function(test) {
    var cbFunction = function(){};
    var options = {
        indexPath: 'screens/',
        baseUrl: 'http://localhost:3000/',
        screenSizes: [ '450', '600', '960', '1024' ],
        files: [ 
           'test/files/index.html',
           'test/files/something.html',
           'test/files/nested/index_nested.html',
           'test/files/nested/something_nested.html' ] 
    }
    var screener = new Screener(grunt, options, cbFunction);
    test.expect(5);
    // function called in constructor
    test.strictEqual(
      screener.pictures.length, 
      screener.options.screenSizes.length * screener.options.files.length
    );

    var firstPic = screener.pictures[0];
    var splitPath = firstPic.path.split('#');
    test.strictEqual(splitPath[0], screener.options.baseUrl);
    test.ok( !( !!splitPath[1].match(/index\.html/) ) );
    test.ok( !isNaN( Number(splitPath[2]) ) );

    // test for non-index.html in path
    test.ok(!!screener.pictures[4].path.split('#')[1].match(/\.html/));

    test.done();
  }
};

/*global describe, it */
'use strict';

var assert       = require('assert');
var fs           = require('fs');

// Mocha helpers (from yeoman-generator)
var helpers = module.exports;
helpers.assertFile = function (file, reg) {
  var here = fs.existsSync(file);
  assert.ok(here, file + ', no such file or directory');

  if (!reg) {
    return assert.ok(here);
  }

  var body = fs.readFileSync(file, 'utf8');
  assert.ok(reg.test(body), file + ' exists but is invalid');
};

describe('grunt-swig', function() {

  it('should create dest/index html', function(){
    helpers.assertFile('test/dest/index.html', /^Hello short path file, Hello world$/);
  });

  it('should create dest/dest/path/to/index.html', function(){
    helpers.assertFile('test/dest/path/to/index.html', /^\Hello long path file$/);
  });

  it('should create dest/tplFile html', function(){
    helpers.assertFile('test/dest/tplFile.html', /^tplFile, tplFile$/);
  });

  it('should create dest/path/to/tplFile html', function(){
    helpers.assertFile('test/dest/path/to/tplFile.html', /^path\/to\/tplFile, tplFile$/);
  });

  it('should create dest/sitemap.xml', function(){
    helpers.assertFile('test/dest/sitemap.xml');
  });

  it('should create dest/robots.txt', function(){
    helpers.assertFile('test/dest/robots.txt');
  });

});

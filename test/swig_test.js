'use strict';

var assert = require('assert'),
    fs = require('fs'),
    helpers = module.exports;

helpers.assertFile = function (file, reg) {
  var here = fs.existsSync(file);
  assert.ok(here, file + ', no such file or directory');

  if (!reg) {
    return assert.ok(here);
  }

  assert.ok(reg.test(fs.readFileSync(file, 'utf8')), file + ' exists but doesn\'t contain expected values');
};

describe('grunt-swig', function() {

  it('should create dest/fixtures/index html', function(){
    helpers.assertFile('test/dest/fixtures/index.html', /^Hello short path file, Hello world/);
  });

  it('should create dest/dest/path/to/index.html', function(){
    helpers.assertFile('test/dest/fixtures/path/to/index.html', /^Hello long path file/);
  });

  it('should create dest/tplFile html', function(){
    helpers.assertFile('test/dest/fixtures/tplFile.html', /^fixtures, tplFile/);
  });

  it('should create dest/path/to/tplFile html', function(){
    helpers.assertFile('test/dest/fixtures/path/to/tplFile.html', /fixtures\/path\/to, tplFile/);
  });

  it('should create dest/sitemap.xml', function(){
    helpers.assertFile('test/dest/sitemap.xml');
  });

  it('should have a priority value of 0.8 in dest/sitemap.xml', function(){
    helpers.assertFile('test/dest/sitemap.xml', /\<priority\>0\.8\<\/priority\>/);
  });

  it('should create dest/robots.txt', function(){
    helpers.assertFile('test/dest/robots.txt');
  });

});

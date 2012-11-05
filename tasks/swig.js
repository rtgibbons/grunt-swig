module.exports = function(grunt) {
  var fs = require('fs'),
    swig = require('swig');

  grunt.registerMultiTask('swig', 'swig templatier', function(context) {
    var config = this;
    var context = context || '';

    swig.init({
      root: config.data.root
    });

    config.file.src.forEach(function(file) {
      var tpl = swig.compileFile(file + ".swig"),
        htmlFile = config.file.dest + file + ".html",
        tplVars = {},
        contextVars = {};

      try {
        tplVars = grunt.file.readJSON(config.data.root + file + ".json");
      } catch(err) {
        tplVars = {};
      }
      try {
        contextVars = grunt.file.readJSON(config.data.root + file + "." + context + ".json");
      } catch(err) {
        contextVars = {};
      }
      tplVars.context = context;
      grunt.log.writeln('Writing HTML to ' + htmlFile);
      grunt.file.write(htmlFile, tpl.render(grunt.utils._.extend(config.data, tplVars, contextVars)));
    });

    grunt.log.writeln('Creating sitemap.xml');
    pages = [];
    var d = new Date; d = d.toISOString();
    config.file.src.forEach(function(file) {
      pages.push({
        url: config.data.siteUrl + file + '.html',
        date: d,
        changefreq: 'weekly',
        priority: '0.5'
      });
    });

    swig.init( { root: __dirname + '/../'});
    var sitemaptpl = swig.compileFile( 'templates/sitemap.xml.swig');
    grunt.file.write(config.file.dest + 'sitemap.xml', sitemaptpl.render({ pages: pages}));
	
    var robotstpl = swig.compileFile( 'templates/robots.txt.swig');
    grunt.file.write(config.file.dest + 'robots.txt', robotstpl.render({ robots_directive: config.data.robots_directive }));
  });
}

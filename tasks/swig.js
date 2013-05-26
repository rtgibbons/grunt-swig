'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
      swig = require('swig');

  grunt.registerMultiTask('swig', 'swig templater', function(context) {
    var config = this,
        context = context || '',
        file_re = /(.*)\.([A-Za-z]+)/i,
        pages = [],
        d = new Date;
        d = d.toISOString()
        
    var defaultPriority = config.data.sitemap_priorities !== undefined && config.data.sitemap_priorities['_DEFAULT_'] !== undefined ? config.data.sitemap_priorities['_DEFAULT_'] : '0.5',
        generateSitemap = config.data.generateSitemap !== undefined ? config.data.generateSitemap : true,
        generateRobotstxt = config.data.generateRobotstxt !== undefined ? config.data.generateRobotstxt : true;
    
    swig.init(config.data.init);

    config.filesSrc.forEach(function(filename) {
      var file = file_re.exec(filename)[1],
          tpl = swig.compileFile(filename),
          htmlFile = config.data.dest + file + ".html",
          tplVars = {},
          contextVars = {},
          globalVars = {};

      try {
        var globalIncVars = grunt.file.readJSON(config.data.root + "global.json");
        globalVars = grunt.util._.extend(config.data, globalIncVars);
      } catch (err) {
        globalVars = grunt.util._.clone(config.data);
      }

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

      grunt.file.write(htmlFile, tpl.render(grunt.util._.extend(globalVars, tplVars, contextVars)));

      if (config.data.sitemap_priorities !== undefined && config.data.sitemap_priorities[file] !== undefined) {
        pages.push({
          url: config.data.siteUrl + file + '.html',
          date: d,
          changefreq: 'weekly',
          priority: config.data.sitemap_priorities[file]
        });
      } else {
        pages.push({
          url: config.data.siteUrl + file + '.html',
          date: d,
          changefreq: 'weekly',
          priority: defaultPriority
        });
      }
    });


    if (generateSitemap) {
      grunt.log.writeln('Creating sitemap.xml');
      swig.init( { root: __dirname + '/../'});
      var sitemaptpl = swig.compileFile( 'templates/sitemap.xml.swig');
      grunt.file.write(config.data.dest + 'sitemap.xml', sitemaptpl.render({ pages: pages}));
    }

    if (generateRobotstxt) {
      grunt.log.writeln('Creating robots.txt');
      var robotstpl = swig.compileFile( 'templates/robots.txt.swig');
      grunt.file.write(config.data.dest + 'robots.txt', robotstpl.render({ robots_directive: config.data.robots_directive }));
    }

  });
}

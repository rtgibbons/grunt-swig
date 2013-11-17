'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
      swig = require('swig'),
      path = require('path');

  grunt.registerMultiTask('swig', 'swig templater', function(tpl_context) {
    var config = this,
        context = tpl_context || '',
        file_re = /(.*)\.([A-Za-z]+)/i,
        pages = [],
        date = new Date(),
        d = date.toISOString();

    var defaultPriority = config.data.sitemap_priorities !== undefined && config.data.sitemap_priorities['_DEFAULT_'] !== undefined ? config.data.sitemap_priorities['_DEFAULT_'] : '0.5',
        generateSitemap = config.data.generateSitemap !== undefined ? config.data.generateSitemap : true,
        generateRobotstxt = config.data.generateRobotstxt !== undefined ? config.data.generateRobotstxt : true;

    swig.Swig(config.data.init);

    config.filesSrc.forEach(function(filename) {
      var file = file_re.exec(filename)[1],
          htmlFile = config.data.dest + file + ".html",
          tplVars = {},
          contextVars = {},
          globalVars = {};

      try {
        var globalIncVars = grunt.file.readJSON(config.data.init.root + "global.json");
        globalVars = grunt.util._.extend(config.data, globalIncVars);
      } catch (err) {
        globalVars = grunt.util._.clone(config.data);
      }

      try {
        tplVars = grunt.file.readJSON(config.data.init.root + file + ".json");
      } catch(err) {
        tplVars = {};
      }

      try {
        contextVars = grunt.file.readJSON(config.data.init.root + file + "." + context + ".json");
      } catch(err) {
        contextVars = {};
      }

      tplVars.context = context;

      // add tpl infos
      tplVars.tplFile = {
          path: file,
          basename: path.basename(file)
      };

      grunt.log.writeln('Writing HTML to ' + htmlFile);

      grunt.file.write(htmlFile, swig.renderFile(config.data.init.root + filename, grunt.util._.extend(globalVars, tplVars, contextVars)));

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
      grunt.file.write(config.data.dest + 'sitemap.xml', swig.renderFile(__dirname + '/../templates/sitemap.xml.swig', { pages: pages}));
    }

    if (generateRobotstxt) {
      grunt.log.writeln('Creating robots.txt');
      grunt.file.write(config.data.dest + 'robots.txt', swig.renderFile(__dirname + '/../templates/robots.txt.swig', { robots_directive: config.data.robots_directive }));
    }

  });
};

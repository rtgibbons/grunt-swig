'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
      swig = require('swig'),
      path = require('path');

  grunt.registerMultiTask('swig', 'swig templater', function(tpl_context) {
    var config = this,
        context = tpl_context || '',
        pages = [],
        date = new Date(),
        d = date.toISOString(),
        defaultPriority = (config.data.sitemap_priorities !== undefined)? config.data.sitemap_priorities._DEFAULT_ : '0.5',
        generateSitemap = config.data.generateSitemap != undefined ? config.data.generateSitemap : true,
        generateRobotstxt = config.data.generateRobotstxt != undefined ? config.data.generateSitemap : true,
        globalVars = {};

    if (config.data.init !== undefined) {
      swig.setDefaults(config.data.init);
    }

    try {
      globalVars = grunt.util._.extend(config.data, grunt.file.readJSON(process.cwd() + '/global.json'));
    } catch (err) {
      globalVars = grunt.util._.clone(config.data);
    }

    this.filesSrc.forEach(function(file) {
      var cwd = globalVars.cwd || "";
      var relativePath = file;
      file = cwd + file;
      if (!grunt.file.exists(file)) {
        grunt.log.warn('Source file "' + file + '" not found.');
        return false;
      } else {
        var ext = config.data.ext;
        if(!ext){ext = path.extname(file);}
        var dirName = path.dirname(relativePath).split('/'),
            destPath = dirName.splice(0, dirName.length).join('/'),
            outputFile = path.basename(file, path.extname(file)),
            htmlFile = config.data.dest + '/' + destPath + '/' + outputFile + ext,
            tplVars = {},
            contextVars = {};

        try {
          tplVars = grunt.file.readJSON(path.dirname(file) + '/' + outputFile + ".json");
        } catch(err) {
          tplVars = {};
        }

        try {
          contextVars = grunt.file.readJSON(path.dirname(file) + '/' + outputFile + "." + context + ".json");
        } catch(err) {
          contextVars = {};
        }

        tplVars.context = context;
        tplVars.tplFile = {
          path: destPath,
          basename: outputFile
        };

        grunt.log.writeln('Writing HTML to ' + htmlFile);

        grunt.file.write(htmlFile, swig.renderFile(file, grunt.util._.extend(globalVars, tplVars, contextVars)));

        if (config.data.sitemap_priorities !== undefined && config.data.sitemap_priorities[destPath + '/' + outputFile + '.html'] !== undefined) {
          pages.push({
            url: config.data.siteUrl + htmlFile.replace(config.data.dest + '/', ''),
            date: d,
            changefreq: 'weekly',
            priority: config.data.sitemap_priorities[destPath + '/' + outputFile + '.html']
          });
        } else {
          pages.push({
            url: config.data.siteUrl + htmlFile.replace(config.data.dest + '/', ''),
            date: d,
            changefreq: 'weekly',
            priority: defaultPriority
          });
        }
      }
    });

    if (generateSitemap) {
      grunt.log.writeln('Creating sitemap.xml');
      grunt.file.write(config.data.dest + '/sitemap.xml', swig.renderFile(__dirname + '/../templates/sitemap.xml.swig', { pages: pages}));
    }

    if (generateRobotstxt) {
      grunt.log.writeln('Creating robots.txt');
      grunt.file.write(config.data.dest + '/robots.txt', swig.renderFile(__dirname + '/../templates/robots.txt.swig', { robots_directive: config.data.robots_directive || '' }));
    }
  });
};

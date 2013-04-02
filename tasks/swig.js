module.exports = function(grunt) {
  
  var fs = require('fs'),
      swig = require('swig');

  grunt.registerMultiTask('swig', 'swig templater', function(context) {
    var config = this;
    var context = context || '';
    
    swig.init({
      root: config.data.root
    });

    config.data.src.forEach(function(file) {
      var tpl = swig.compileFile(file + ".swig"),
      htmlFile = config.data.dest + file + ".html",
      globalVars = grunt.util._.clone(config.data),
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
      grunt.file.write(htmlFile, tpl.render(grunt.util._.extend(globalVars, tplVars, contextVars)));
    });

    grunt.log.writeln('Creating sitemap.xml');
    pages = [];
    
    var d = new Date; d = d.toISOString(),
    defaultPriority = config.data.sitemap_priorities !== undefined && config.data.sitemap_priorities['_DEFAULT_'] !== undefined ? config.data.sitemap_priorities['_DEFAULT_'] : '0.5';
    
    config.data.src.forEach(function(file) {
      if(config.data.sitemap_priorities !== undefined && config.data.sitemap_priorities[file] !== undefined){
        pages.push({
          url: config.data.siteUrl + file + '.html',
          date: d,
          changefreq: 'weekly',
          priority: config.data.sitemap_priorities[file]
        });
      }else{
        pages.push({
          url: config.data.siteUrl + file + '.html',
          date: d,
          changefreq: 'weekly',
          priority: defaultPriority
        });
      }
    });

    swig.init( { root: __dirname + '/../'});
    var sitemaptpl = swig.compileFile( 'templates/sitemap.xml.swig');
    grunt.file.write(config.data.dest + 'sitemap.xml', sitemaptpl.render({ pages: pages}));

    var robotstpl = swig.compileFile( 'templates/robots.txt.swig');
    grunt.file.write(config.data.dest + 'robots.txt', robotstpl.render({ robots_directive: config.data.robots_directive }));
  
  });
}

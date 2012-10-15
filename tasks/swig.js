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
        tplVars, contextVars;

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
  });
}

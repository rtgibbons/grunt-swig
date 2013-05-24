'use strict';

module.exports = function (grunt) {
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    swig: {
      development: {
        root: 'test/fixtures/src/',
        dest: 'test/dest/',
        cwd: 'test/fixtures/src/',
        src: ['**/*.swig'],
        siteUrl: 'http://mydomain.net/',
        generateSitemap: false,
        generateRobotstxt: false,
        test: {
          var1: 'long path file',
          var2: 'short path file'
        }
      }
    },
    mochaTest: {
      files: ['test/*_test.js']
    },
    clean: {
      files: 'test/dest'
    }
  });

  grunt.registerTask('test', [
    'clean',
    'swig',
    'mochaTest',
  ]);

  grunt.registerTask('default', 'test');
};

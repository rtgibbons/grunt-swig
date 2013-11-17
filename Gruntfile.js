'use strict';

module.exports = function (grunt) {
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    swig: {
      development: {
        init: {
          root: 'test/fixtures/src/'
        },
        dest: 'test/dest/',
        cwd: 'test/fixtures/src/',
        src: ['**/*.swig'],
        siteUrl: 'http://mydomain.net/',
        generateSitemap: true,
        generateRobotstxt: true,
        test: {
          var1: 'long path file',
          var2: 'short path file'
        }
      }
    },
    jshint: {
      options: {
        'jshintrc': '.jshintrc',
        'reporter': 'jslint',
        'reporterOutput': 'jslint.xml',
        'force': true
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ]
    },
    mochaTest: {
      options: {
          reporter: 'xunit',
          captureFile: 'tests.xml'
      },
      files: ['test/*_test.js']
    },
    clean: {
      files: 'test/dest'
    }
  });

  grunt.registerTask('test', [
    'clean',
    'swig',
    'jshint',
    'mochaTest',
  ]);

  grunt.registerTask('default', 'test');
};

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
          allowErrors: false,
          autoescape: true
        },
        dest: 'test/dest',
        src: ['**/*.swig', '!templates/*.swig'],
        siteUrl: 'http://mydomain.net/',
        generateSitemap: true,
        generateRobotstxt: true,
        test: {
          var1: 'long path file',
          var2: 'short path file'
        },
        filters: {
          f: 'test/filter'
        },
        sitemap_priorities: {
          '_DEFAULT_': '0.7',
          'fixtures/index.html': 0.8
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

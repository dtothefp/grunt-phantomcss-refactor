/*
 * grunt-phantom-slimer-screens
 * 
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/{,**/}*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.',
          keepalive: true
        }
      }
    },

    phantomcss: {
      options: {
        baseUrl: 'http://localhost:3000/',
        serverRoot: 'test/files/',
        gitDiff: true,
      },
      desktop: {
        options: {
          screenshots: 'screens/desktop/',
          results: 'results/desktop/',
          viewportSize: [1024, 768]
        },
        src: [
          'test/files/{,**/}*.html'
        ]
      }//,
      // mobile: {
      //   options: {
      //     screenshots: 'screens/mobile/',
      //     results: 'results/mobile/',
      //     viewportSize: [320, 480]
      //   },
      //   src: [
      //     'test/files/{,**/}*.html'
      //   ]
      // }
    }
  });

  // Actually load this plugin's task(s).
  //grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-phantomcss');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

  grunt.registerTask('server', ['connect:server']);

};

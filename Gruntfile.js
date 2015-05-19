/*
 * grunt-html-validation
 * https://github.com/praveen/grunt-html-validation
 *
 * Copyright (c) 2013 - 2014 praveenvijayan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },
    'html-validation': { // Grunt w3c validation plugin
        options: {
            reset: grunt.option('reset') || false,
            stoponerror:false,
            // remotePath: "http://decodize.com/",
            // remoteFiles: ["html/slidemote-universal-remote-control-for-html5-presentations",
            //               "GAE/linktomob-share-your-links-quickly-and-easily-on-mobile-devices/",
            //               "html/getting-started-with-yeoman-1-dot-0-beta-on-windows/",
            //               "html/moving-from-wordpress-to-octopress/",
            //               "css/site-preloading-methods/",
            //               "html/sublime-text-2-bidirectional-language-support-plugin/"]
            // remoteFiles: "validation-files.json",
            relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta.","Element title must not be empty."]
        },
        files: {
            src: ['test/html/*.html',
                '!test/html/index.html',
                '!test/html/404.html']
        }
    },
    'css-validation': { // Grunt w3c validation plugin
      options: {
          reset: grunt.option('reset') || false,
          stoponerror:false,
          // remotePath: "http://decodize.com/",
          // remoteFiles: ["html/slidemote-universal-remote-control-for-html5-presentations",
          //               "GAE/linktomob-share-your-links-quickly-and-easily-on-mobile-devices/",
          //               "html/getting-started-with-yeoman-1-dot-0-beta-on-windows/",
          //               "html/moving-from-wordpress-to-octopress/",
          //               "css/site-preloading-methods/",
          //               "html/sublime-text-2-bidirectional-language-support-plugin/"]
          // remoteFiles: "validation-files.json",
          relaxerror: [],
          profile: 'css3', // possible profiles are: none, css1, css2, css21, css3, svg, svgbasic, svgtiny, mobile, atsc-tv, tv
          medium: 'all', // possible media are: all, aural, braille, embossed, handheld, print, projection, screen, tty, tv, presentation
          warnings: '0' // possible warnings are: 2 (all), 1 (normal), 0 (most important), no (no warnings)
      },
      files: {
          src: ['test/css/*.css']
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  // grunt.loadNpmTasks('grunt-html-validation');
  

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  grunt.registerTask('multiple', ['html-validation', 'css-validation', 'clean', 'nodeunit']);
  
  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

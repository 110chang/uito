module.exports = function(grunt) {
  var path = require('path');

  grunt.initConfig({
    // bowerでインストールしたライブラリをsource以下に置く
    bower: {
      install: {
        options: {
          targetDir: './source/js/lib',
          layout: function(type, component, source) {
            return path.join();
          },
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false
        }
      }
    },
    watch: {
      files: [
        './source/js/**/*.js'
      ],
      tasks: ['jasmine']
    },
    requirejs: {
      compile: {
        options: {
          //name : 'main',
          include: ["lib/almond", "main"],
          baseUrl: "./source/js",
          out: "./source/js/all.js",
          optimize: "none",
          wrap: true
        }
      }
    },
    middleman: {
      options: {
        useBundle: true
      },
      server: {
        options: {
          command: "server",
          useBundle: true,
          environment: "development",
          host: "192.168.1.11",
          port: 4567,
          clean: true,
        }
      },
      build: {
        options: {
          command: 'build'
        }
      }
    },
    jshint: {
      files: [
        './source/js/**/*.js',
        '.jshintrc'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jasmine: {
      src: './source/js/mod/inherit',
      options: {
        specs: './source/js/spec/*Spec.js',
        helpers: './source/js/spec/*Helper.js',
        keepRunner: true,
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          //requireConfigFile: './source/js/main.js',
          requireConfig: {
            baseUrl: './source/js/',
            urlArgs: 'bust=' + (new Date()).getTime(),
            paths: {
              'jquery' : 'lib/jquery',
              'jquery.easing' : 'lib/jquery.easing'
            },
            shim: {
              'jquery.easing': ['jquery']
            }
          }
        },
        vendor: [
          './node_modules/jasmine-jquery/vendor/jquery/jquery.js',
          './node_modules/jasmine-jquery/lib/jasmine-jquery.js'
        ],
        phantomjs : {
          'ignore-ssl-errors' : true
        }
      }
    }
  });

  //matchdepでpackage.jsonから"grunt-*"で始まる設定を読み込む
  //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', '!grunt-template-jasmine-requirejs']
  });
  
  grunt.registerTask('init', ['bower:install']);
  grunt.registerTask('server', ['middleman:server']);
  grunt.registerTask('build', ['requirejs:compile', 'middleman:build', 'jshint']);
  // short hands
  grunt.registerTask('i', ['bower:install']);
  grunt.registerTask('s', ['middleman:server']);
  grunt.registerTask('w', ['watch']);
  grunt.registerTask('b', ['requirejs:compile', 'middleman:build', 'jshint']);
}

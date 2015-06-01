module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	clean: {
      dist: 'dist'
    },
	jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      core: {
        src: 'js/*.js'
      }
    },
	concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      style8: {
        src: [
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
	less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'less/<%= pkg.name %>.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },
	cssmin: {
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },
	copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: 'dist/'
      }
    },
	watch: {
      src: {
        files: '<%= jshint.core.src %>',
        tasks: ['jshint:core', 'concat', 'uglify']
      },
      less: {
        files: 'less/**/*.less',
        tasks: ['less','cssmin']
      }
    },
  });
  
  // 加载提供任务的插件。
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  // 自定义任务列表。
  grunt.registerTask('dist-js', ['concat', 'uglify:build']);
  grunt.registerTask('dist-css', ['less:compileCore','cssmin']);
  grunt.registerTask('default', ['clean:dist', 'copy:fonts']);

};
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    dirs: {
      src: '.',
      build: 'build',
      dist: 'dist',
      npm: 'node_modules'
    },
    
    jshint: {
      files: [
        'Gruntfile.js',
        '<%= dirs.src %>/js/*.js'
      ],
      options: {
      }
    },
      
    uglify: {
      dist_main: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          mangle: {
            except: [] // tableau de noms de variables (chaines de caractères)
          }
        },
        files: {
          '<%= dirs.build %>/js/test1_min.js':  ['<%= dirs.build %>/js/test1.js']
        }
      }
    },
    
    cssmin: {
      dist: {
        expand: true,
        cwd: '<%= dirs.build %>/css/',
        src: ['**/*.css', '!**.*.min.css'],
        dest: '<%= dirs.dist %>/public_html/css/',
        ext: '.css'
      }
    },
    
    copy: {
      html_src: {
        files: [
          {
            expand: true, 
            cwd: '<%= dirs.src %>/html/', 
            src: [
              '**/*.html'
            ],
            dest: '<%= dirs.dist %>/public_html/'
          }
        ]
      },
      css_src: {
        files: [
          {
            expand: true, 
            cwd: '<%= dirs.src %>/css/', 
            src: [
              '**/*.css'
            ],
            dest: '<%= dirs.build %>/css/'
          }
        ]
      },
      js_mine_src: {
        files: [
          {
            expand: true, 
            cwd: '<%= dirs.src %>/js/', 
            src: [
              'test1.js'
            ], 
            dest: '<%= dirs.build %>/js/'
          }
        ]
      },
      js_deps_src: {
        files: [
          {
            src: '<%= dirs.npm %>/requirejs/require.js', 
            dest: '<%= dirs.build %>/js/lib/require.js'
          },             
          {
            src: '<%= dirs.npm %>/eve/eve.js', 
            dest: '<%= dirs.build %>/js/lib/eve.js'
          },             
          {
            src: '<%= dirs.npm %>/raphael/raphael.no-deps.js', 
            dest: '<%= dirs.build %>/js/lib/raphael.js'
          }
        ]
      },
      js_dist_src: {
        files: [
          {
            expand: true, 
            cwd: '<%= dirs.build %>/js/', 
            src: ['**/*.js'],
            dest: '<%= dirs.dist %>/public_html/js/'
          }
        ]
      }
    },
    
    clean: ["<%= dirs.build %>/**/*", "<%= dirs.dist %>/**/*"]
    
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.registerTask('build', ['clean', 'copy:js_mine_src', 'copy:js_deps_src']);
  
    
  grunt.registerTask('test', ['jshint']);
  
  grunt.registerTask('dist', ['test', 'build', 'copy:html_src', 'copy:css_src', 'cssmin', 'uglify:dist_main', 'copy:js_dist_src']);
  
  grunt.registerTask('default', ['test', 'clean']);
};
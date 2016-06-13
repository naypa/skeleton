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
      build: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          mangle: {
            except: [] // tableau de noms de variables (chaines de caractères)
          }
        },
        files: {
          '<%= dirs.build %>/optimized/public_html/js/test1.js':  ['<%= dirs.build %>/public_html/js/test1.js']
        }
      }
    },
    
    cssmin: {
      build: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          mangle: {
            except: [] // tableau de noms de variables (chaines de caractères)
          }
        },
        files: [
          {
            expand: true,
            cwd: '<%= dirs.build %>/public_html/css/',
            src: ['**/*.css', '!**/*.min.css'],
            dest: '<%= dirs.build %>/optimized/public_html/css/',
            ext: '.css'
          }
        ]
      }
    },
    
    copy: {
      build: {
        files: [
          // html
          {
            expand: true, 
            cwd: '<%= dirs.src %>/html/', 
            src: ['**/*.html'],
            dest: '<%= dirs.build %>/public_html/'
          },
          // css
          {
            expand: true, 
            cwd: '<%= dirs.src %>/css/', 
            src: ['**/*.css'],
            dest: '<%= dirs.build %>/public_html/css/'
          },
          // js mine
          {
            expand: true, 
            cwd: '<%= dirs.src %>/js/', 
            src: [
              'test1.js'
            ], 
            dest: '<%= dirs.build %>/public_html/js/'
          },
          // js deps
          {
            src: '<%= dirs.npm %>/requirejs/require.js', 
            dest: '<%= dirs.build %>/public_html/js/lib/require.js'
          },             
          {
            src: '<%= dirs.npm %>/eve/eve.js', 
            dest: '<%= dirs.build %>/public_html/js/lib/eve.js'
          },             
          {
            src: '<%= dirs.npm %>/raphael/raphael.no-deps.js', 
            dest: '<%= dirs.build %>/public_html/js/lib/raphael.js'
          }
        ]
      },
      build_optimized: {
        files: [
          { 
            expand: true, 
            cwd: '<%= dirs.build %>/public_html/', 
            src: ['*.html', '**/*.*'], 
            dest: '<%= dirs.build %>/optimized/public_html/'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true, 
            cwd: '<%= dirs.build %>/optimized/public_html/', 
            src: [],
            dest: '<%= dirs.dist %>'
          }
        ]
      }
    },
    
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= dirs.src %>/html/',
            src: ['*.html', '**/*.html'],
            dest: '<%= dirs.build %>/optimized/public_html/',
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
  
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  grunt.registerTask('build', [
                       'test', 
                       'clean',
                       'copy:build', 'copy:build_optimized',
                       'uglify',
                       'cssmin',
                       'htmlmin'
                     ]);
  
  grunt.registerTask('test', ['jshint']);
  
  grunt.registerTask('dist', ['build', 'copy:dist']);
  
  grunt.registerTask('default', ['test', 'clean']);
};

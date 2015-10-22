module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['src/*.js']
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        uglify: {
            options: {
                banner: '/**\n' +
                    ' * <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' * @author: <%= pkg.author %>\n' +
                    ' * @homepage: <%= pkg.homepage %>\n' +
                    ' * @license: <%= pkg.license %>\n' +
                    ' */\n\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['uglify']);

    grunt.registerTask('default', ['lint', 'test', 'build']);
};
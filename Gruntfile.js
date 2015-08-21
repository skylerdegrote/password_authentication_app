module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            }
        },
        copy: {
            style: {
                expand: true,
                cwd: 'client/styles/',
                src: [
                    "styles.css"
                ],
                "dest": "server/public/assets/styles/"
            },
            html: {
                expand: true,
                cwd: 'client/views/',
                src: [
                    'index.html',
                    'users.html',
                    'register.html'
                ],
                "dest": "server/public/views/"
            },
            angular: {
                expand: true,
                cwd: 'node_modules',
                src: 'angular/angular.min.js',
                dest: 'server/public/vendors/'
            },

        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};
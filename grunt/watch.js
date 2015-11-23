module.exports = {
    fest: {
        files: ['templates/**/*.xml'],
        tasks: ['fest'],
        options: {
            interrupt: true,
            atBegin: true
        }
    },
    server: {
        files: ['public_html/js/**/*.js', 'public_html/css/**/*.css'],
        options: {
            livereload: {
                host: 'localhost',
                port:19234,
            }
        }
    },
    sass: {
        files: ['public_html/**/*.scss'],
        tasks: ['clean', 'sass', 'concat_css', 'cssmin'],
        options: {
            atBegin: true,
            interrupt: true
        }
    }
};
module.exports = {
    fest: {
        files: ['templates/*.xml'],
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
    }
};
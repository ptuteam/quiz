module.exports = {
    dist: {
        options: {
            update: true
        },
        files: [{
            expand: true,
            cwd: 'public_html/blocks',
            src: ['style.scss'],
            dest: 'public_html/css/build/',
            ext: '_b.css'
        }]
    }
}
module.exports = {
    options: {
        shorthandCompacting: false,
        roundingPrecision: -1
    },
    target: {
        files: {
            'public_html/css/build/style.min.css': ['public_html/css/build/style.css']
        }
    }
}
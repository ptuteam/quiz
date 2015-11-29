module.exports = {
    build: {
        options: {
            baseUrl: "public_html/js",
            mainConfigFile: "public_html/js/requireconf.js",
            name: "lib/almond",
            include: 'requireconf',
            optimize: "none",
            out: "public_html/js/build/build-r.js"
        }
    }
}
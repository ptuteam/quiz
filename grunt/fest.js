module.exports = function(grunt) {
    return {
        templates: {
            files: [{
                expand: true,
                cwd: 'templates',
                src: '*.xml',
                dest: 'public_html/js/tmpl'
            }],
            options: {
                template: function(data) {
                    return grunt.template.process(
                        'define(function() { return <%= contents %> ;});', {
                        data: data
                    });
                }
            }
        }
    };
};
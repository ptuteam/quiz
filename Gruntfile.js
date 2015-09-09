module.exports = function(grunt) {
	/* Функция обертка, все внутри нее */
	grunt.initConfig({
		concat: { /* Настройки задачи */
			options: { /* Настройки задачи */
				separator: ';'
			},
			foo: { /* Цель foo */
				options: { separator: '' },
				src: ['js/first.js', 'js/second.js'],
				dest: 'js/foo.js'
			},
			bar: { /* Цель bar */ }
		},
		any_other_name: 'hello' /* Любое произвольное свойство */
	});

	// Загрузка плагинов, на примере "concat".
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Определение задач, default должен быть всегда.
	grunt.registerTask('default', ['concat']);
};

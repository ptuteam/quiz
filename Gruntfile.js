module.exports = function(grunt) {
	/* Функция обертка, все внутри нее */
	grunt.initConfig({
		concat: { /* Настройки задачи */
			options: { /* Настройки задачи */
				separator: ';'
			},
			foo: { /* Цель foo */
				options: {
					separator: ''
				},
				src: ['js/first.js', 'js/second.js'],
				dest: 'js/foo.js'
			},
			bar: { /* Цель bar */ }
		},
		shell: {
			server: { /* Подзадача */
				command: 'java -cp newgame-server.jar main.Main 8080',
				src: ['public_html/js/**/*.js'],
				/* следим за JS */
				options: {
					livereload: true /* автоматическая перезагрузка */
				}
				/* запуск сервера */
			}
		},
		fest: {
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
							'var <%= name %>Tmpl = <%= contents %> ;', {
								data: data
							}
						);
					}
				}
			}
		},
		watch: {
			fest: { /* Цель */
				files: ['templates/*.xml'],
				/* следим за шаблонами */
				tasks: ['fest'],
				/* перекомпилировать */
				options: {
					atBegin: true /* запустить задачу при старте */
				}
			}
		},
		any_other_name: 'hello' /* Любое произвольное свойство */
	});

	// Загрузка плагинов, на примере "concat".
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Определение задач, default должен быть всегда.
	grunt.registerTask('default', ['shell', 'watch']);
};
module.exports = {
	'default':['clean', 'requirejs', 'uglify', 'concurrent:run'],
	'dev':['clean', 'concurrent:run'],
	'build':['shell:buildServer']
}
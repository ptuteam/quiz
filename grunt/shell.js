module.exports = {
    options: {
        stdout: true,
        stderr: true
    },
    buildServer: {
    	command: 'sh build-server.sh'
    },
    runServer: {
        command: 'java -jar quiz-server.jar'
    }
};
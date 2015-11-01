mvn -f ./quiz-server/pom.xml compile assembly:single
cp ./quiz-server/target/quiz-server-1.0-jar-with-dependencies.jar ./quiz-server.jar
rsync -a quiz-server/configuration/  configuration
rsync -a quiz-server/server_tml/  server_tml
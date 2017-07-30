FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD target/do-not-forget-backend-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]
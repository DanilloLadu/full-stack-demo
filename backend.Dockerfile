# Build stage
FROM maven:3.8.1-openjdk-17-slim AS build
WORKDIR /build
COPY ./backend/pom.xml .
RUN mvn dependency:go-offline
COPY ./backend/src ./src/
RUN mvn clean package -DskipTests

 # Runtime stage
 FROM amazoncorretto:17-alpine
 ARG PROFILE=dev
 ARG APP_VERSION=1.0.0

 WORKDIR /app
 COPY --from=build /build/target/backend-*.jar /app/

 EXPOSE 8088

 ENV DB_URL=jdbc:postgresql://localhost:5432/demo
 ENV MAILDEV_URL=localhost

 ENV ACTIVE_PROFILE=${PROFILE}
 ENV JAR_VERSION=${APP_VERSION}
#  ENV EMAIL_HOST_NAME: localhost
#  ENV EMAIL_USER_NAME: missing_user_name
#  ENV EMAIL_PASSWORD: missing_password

CMD java -jar -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL}  backend-${JAR_VERSION}.jar

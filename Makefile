open-browsers:
	firefox "http://127.0.0.1:8080/api/v1/swagger-ui/index.html"
	firefox "http://127.0.0.1:8025"

start-dev:
	./backend/mvnw install
	./backend/mvnw spring-boot:run

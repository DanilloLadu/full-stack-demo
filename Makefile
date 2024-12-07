open-browsers:
	firefox "http://127.0.0.1:8080/api/v1/swagger-ui/index.html"
	firefox "http://127.0.0.1:8025"

install:
	./backend/mvnw -f backend/pom.xml clean install
	make dev

dev:
	./backend/mvnw -f backend/pom.xml spring-boot:run

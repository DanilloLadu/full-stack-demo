open-browsers:
	firefox -new-tab -url "http://127.0.0.1:8080/api/v1/swagger-ui/index.html" -new-tab -url "http://127.0.0.1:8025"
	close

install:
	./backend/mvnw -f backend/pom.xml clean install
	make dev

dev:
	./backend/mvnw -f backend/pom.xml spring-boot:run

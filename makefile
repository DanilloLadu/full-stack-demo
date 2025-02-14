start:
	xfce4-terminal --tab --color-bg=#1E2D00 --command "make docker-dev" --tab --color-bg=#5B0C12 --command "make dev"

open:
	firefox -new-tab -url "http://127.0.0.1:8080/api/v1/swagger-ui/index.html" -new-tab -url "http://127.0.0.1:8025" -new-tab -url "http://localhost:4200" &

install:
	./backend/mvnw -f backend/pom.xml clean install
	make dev

dev:
	./backend/mvnw -f backend/pom.xml spring-boot:run

docker-dev:
	docker compose -f compose-dev.yml up

docker-prd:
	docker compose -f compose-prd.yml up

docker-build:
	docker-compose -f compose-prd.yml build
	docker-compose -f compose-prd.yml up
		

# docker build -t bsn/bsn:1.0.0 -f ./backend.Dockerfile .
# docker-compose -f compose-prd.yml up --build --force-recreate --no-deps frontend
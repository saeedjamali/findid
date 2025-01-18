update:
	git pull
	docker container prune
	docker volume prune
	docker compose up --build -d
update:
	git pull
	docker container prune
	docker volume prune
	docker builder prune
	docker build --cpu-quota=50000  --memory=512m -t findid:latest .
	docker-compose up -d
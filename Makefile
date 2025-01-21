update: clean
	git pull
	docker build --cpu-quota=50000 --progress=plain --no-cache   --memory=512m -t findid:latest .
	docker compose up -d

clean:
	git restore .
	git reset --hard
	docker image prune -f
	docker container prune -f
	docker volume prune -f
	docker builder prune -f
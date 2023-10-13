# Tear down Docker images
docker ps -q | ForEach-Object { docker stop $_ }
docker images -a -q | ForEach-Object { docker rmi $_ }
docker volume ls -q | ForEach-Object { docker volume rm $_ }
docker system prune -f

docker ps -q | ForEach-Object { docker stop $_ }
docker images -a -q | ForEach-Object { docker rmi $_ }
docker system prune -f
docker build --pull --rm -f "catalog_mysqldb/Dockerfile" -t dbic:latest "catalog_mysqldb"
docker run --rm -d  -p 3306:3306/tcp -p 33060:33060/tcp dbic:latest
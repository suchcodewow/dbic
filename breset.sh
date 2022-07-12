docker kill $(docker ps -q)
docker rmi $(docker ps -q -a)
docker system prune -f
docker build --pull --rm -f "catalog_mysqldb/Dockerfile" -t dbic:latest "catalog_mysqldb"
docker run --rm -d -p 3306:3306/tcp -p 33060:33060/tcp dbic:latest

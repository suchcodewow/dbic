# Tear down Docker images
docker ps -q | ForEach-Object { docker stop $_ }
docker images -a -q | ForEach-Object { docker rmi $_ }
docker system prune -f

# Build Catalog/mysql
docker build --rm -f "catalog_mysqldb/Dockerfile" -t dbiccatdb:latest "catalog_mysqldb"
docker run --rm -d  -p 3306:3306/tcp -p 33060:33060/tcp dbiccatdb:latest

# Build Catalog/Api
docker build --rm -f "catalogApi/Dockerfile" -t dbiccatapi:latest "catalogApi"
docker run --rm -d -p 8080:8080/tcp dbiccatapi:latest
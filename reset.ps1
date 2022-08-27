# Tear down Docker images
docker ps -q | ForEach-Object { docker stop $_ }
docker images -a -q | ForEach-Object { docker rmi $_ }
docker system prune -f

# Build Catalog/mysql
#Push-Location .\catalogApi
#.\mvnw clean install -DskipTests=true
#Pop-Location
#docker build --rm -f "catalog_mysqldb/Dockerfile" -t dbiccatdb:latest "catalog_mysqldb"
#docker run --rm -d  -p 3306:3306/tcp -p 33060:33060/tcp dbiccatdb:latest

# Build Catalog/Api
#docker build --rm -f "catalogApi/Dockerfile" -t dbiccatapi:latest "catalogApi"
#docker run --rm -d -p 8080:8080/tcp dbiccatapi:latest

#docker build -f "C:\Users\admin\source\dbic\OrdersApi\OrdersAPI\Dockerfile" --force-rm -t ordersapi:dev --target base  --label "com.microsoft.created-by=visual-studio" --label "com.microsoft.visual-studio.project-name=OrdersAPI" "C:\Users\admin\source\dbic\OrdersApi" 
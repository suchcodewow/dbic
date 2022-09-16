# Tear down Docker images
docker container kill $(docker container ls -q)
docker system prune -a -f

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

#docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=yourStrong(!)Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
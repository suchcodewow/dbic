#!/bin/bash

#Stop Apps
#kill $(ps -ef | grep maven | grep -v grep | awk '{ print $2 }')
#kill $(ps -ef | grep npm | grep -v grep | awk '{ print $2 }')

# Tear down Docker images
docker kill $(docker ps -q)
docker rmi $(docker ps -q -a)
docker system prune -f

# Build Catalog/mysql
docker build --rm -f "catalog_mysqldb/Dockerfile" -t dbiccatdb:latest "catalog_mysqldb"
docker run --rm -d -p 3306:3306/tcp -p 33060:33060/tcp dbiccatdb:latest

# Build Catalog/Api
docker build --rm -f "catalogApi/Dockerfile" -t dbiccatapi:latest "catalogApi"
docker run --rm -d -p 8080:8080/tcp dbiccatapi:latest

#Start Apps
#mvn -f ./catalogApi/ spring-boot:run >catalogApi.log &
#npm run dev --prefix ./ui/ >ui.log &

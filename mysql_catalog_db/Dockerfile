#When building tag as 'catalog:latest'
FROM mysql

#COPY ./setup.sql /docker-entrypoint-initdb.d
ENV MYSQL_USER=api
ENV MYSQL_PASSWORD=password
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=catalogDb
#CMD [ "mysqld", "--init-file=/tmp/create-db.sql" ]

EXPOSE 3306
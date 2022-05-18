FROM mysql

COPY ./create-db.sql /tmp
ENV MYSQL_ROOT_PASSWORD=password
CMD [ "mysqld", "--init-file=/tmp/create-db.sql" ]

EXPOSE 3306
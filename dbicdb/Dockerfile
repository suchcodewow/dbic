FROM mysql

COPY ./create-db.sql /tmp

CMD [ "mysqld", "--init-file=/tmp/create-local-db.sql" ]

EXPOSE 3306
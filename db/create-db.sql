-- Local database definition.

DROP DATABASE IF EXISTS local_db;

CREATE DATABASE local_db;

USE local_db;

DROP TABLE IF EXISTS catalog;

CREATE TABLE catalog (
  id int(10) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL DEFAULT '',
  CONSTRAINT catalog_pk PRIMARY KEY (id)
);

INSERT INTO catalog (title) VALUES('book');
INSERT INTO catalog (title) VALUES('toy');
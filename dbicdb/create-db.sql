-- Local database definition.

DROP DATABASE IF EXISTS local_db;

CREATE DATABASE local_db;

USE local_db;

DROP TABLE IF EXISTS catalog;

CREATE TABLE catalog (
  id int(10) NOT NULL,
  title varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);

INSERT INTO catalog VALUES(1, 'book');
INSERT INTO catalog VALUES(2, 'toy');
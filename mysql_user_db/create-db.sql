-- Local database definition.

DROP DATABASE IF EXISTS user_db;

CREATE DATABASE user_db;

USE user_db;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  fullName varchar(45) NOT NULL,
  accountId varchar(45) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO catalog (fullName,accountId) VALUES('bob smith','happy-llama');
INSERT INTO catalog (fullName,accountId) VALUES('Troy Lube','wonder-duck');
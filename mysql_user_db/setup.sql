-- Local database definition.

-- DROP DATABASE IF EXISTS customerDb;

-- CREATE DATABASE customerDb;

-- USE customerDb;

DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  id int NOT NULL AUTO_INCREMENT,
  fullName nvarchar(500) NOT NULL,
  accountId nvarchar(500) NOT NULL,
  accountType nvarchar(500) NOT NULL,
  createDate datetime,
  PRIMARY KEY (id)
);

INSERT INTO customers (fullName,accountId,accountType,createDate) VALUES('bob smith','happy-llama','user','2021-06-21');
INSERT INTO customers (fullName,accountId,accountType,createDate) VALUES('Troy Lube','wonder-duck','admin','2021-06-21');
-- Local database definition.

-- DROP DATABASE IF EXISTS customerDb;

-- CREATE DATABASE customerDb;

-- USE customerDb;

DROP TABLE IF EXISTS catalog;

CREATE TABLE catalog (
  id int NOT NULL AUTO_INCREMENT,
  title nvarchar(500) NOT NULL,
  img nvarchar(500) NOT NULL,
  shortDesc nvarchar(500) NOT NULL,
  createDate datetime,
  updateDate datetime,
  PRIMARY KEY (id)
);

INSERT INTO catalog (title,img,shortDesc,createDate) VALUES('book','link1','a book.','2021-06-21');
INSERT INTO catalog (title,img,shortDesc,createDate) VALUES('puppet','link2','a creepy puppet.','2021-06-21');

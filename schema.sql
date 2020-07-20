-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS somaKitchen;
-- Creates the "blogger" database --
CREATE DATABASE somaKitchen;

USE somaKitchen;

CREATE TABLE contactUs (
    id int NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(20) NOT NULL,
    phoneNumber INT(10) NOT NULL,
    email VARCHAR(40) NOT NULL,
    message VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE subscribe (
    id int NOT NULL AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);






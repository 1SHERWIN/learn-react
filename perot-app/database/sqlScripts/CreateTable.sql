CREATE DATABASE if not exists perot_museum;
USE perot_museum;

SET GLOBAL local_infile=1;

CREATE TABLE if not exists users (
    nickname varchar(50) PRIMARY KEY,
    name varchar(50),
    checkpoint_1 boolean DEFAULT FALSE,
    checkpoint_2 boolean DEFAULT FALSE,
    checkpoint_3 boolean DEFAULT FALSE,
    checkpoint_4 boolean DEFAULT FALSE,
    checkpoint_5 boolean DEFAULT FALSE,
    checkpoint_completion boolean DEFAULT FALSE,
    email varchar(50)
);

CREATE TABLE if not exists adjectives (
    adjectives varchar(50)
);

CREATE TABLE if not exists animals (
    animals varchar(50)
);

LOAD DATA INFILE '/tmp/database/data_files/adjectives.csv'
    INTO TABLE adjectives
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES;

LOAD DATA INFILE '/tmp/database/data_files/animals.csv'
    INTO TABLE animals
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES;
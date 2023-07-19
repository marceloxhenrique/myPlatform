SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user, course, lesson, user_have_course;
SET foreign_key_checks = 1;

USE myPlatform;

CREATE TABLE user (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
admin BOOL NOT NULL  DEFAULT 0,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
hashedPassword VARCHAR(100) NOT NULL,
profilePicture VARCHAR(200) NULL,
aboutSection TEXT NULL
);

CREATE TABLE course (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50),
description TEXT,
complete BOOL default 0
);

CREATE TABLE user_have_course (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
data DATE,
user_id INT,
course_id INT,
FOREIGN KEY (user_id) REFERENCES user(id),
FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE lesson (
id INT PRIMARY KEY NOT NULL  AUTO_INCREMENT,
lesson_name VARCHAR(50) NOT NULL,
duration INT NOT NULL,
complete BOOL default 0 NOT NULL,
url VARCHAR(80) NOT NULL,
text TEXT,
course_id INT,
FOREIGN KEY (course_id) REFERENCES course(id)
);

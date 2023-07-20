SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user, course, lesson, user_have_course;


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
title VARCHAR(50) NOT NULL,
description TEXT,
color VARCHAR(50) NOT NULL,
initials VARCHAR(50) NOT NULL
);

CREATE TABLE user_have_course (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
data DATE NOT NULL,
user_id INT NOT NULL,
course_id INT NOT NULL,
complete BOOL default 0 NOT NULL,
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
course_id INT NOT NULL,
FOREIGN KEY (course_id) REFERENCES course(id)
);


INSERT INTO user (admin, firstname, lastname, email, hashedPassword, profilePicture, aboutSection)
VALUES
(0, 'Marcelo', 'da Silva', 'marcelo@example.com', '$2b$10$4UlN2HIZ2hVX89fyeV/6Zu/4pOYBYExvz9F2RNxszZVWnrKkye.hG', 'url', 'Text about me');

INSERT INTO course (title, description, color, initials)
VALUES 
('HTML', 'HTML for begginers', '#DC4A23', 'HTML'),
('CSS', 'CSS for begginers', '#136DB0', 'CSS' ),
('JavaScript', 'JavaScript for beginners', '#EFD81A', 'JS'),
('React Js', 'React js for beginners', '#47CEF6', 'R');


INSERT INTO lesson (lesson_name, duration, complete, url, text, course_id)
VALUES
('Variables', 30, 0, 'url', 'Text about this lesson', 1),
('Understandig React Js', 45, 0, 'url', 'Text about React Js lesson', 2);

SET foreign_key_checks = 1;
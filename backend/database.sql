SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user, course, lesson, user_have_course;


USE myPlatform;

CREATE TABLE user (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
admin BOOL DEFAULT 0,
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
complete BOOLEAN default 0 NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE lesson (
id INT PRIMARY KEY NOT NULL  AUTO_INCREMENT,
lesson_name VARCHAR(50) NOT NULL,
duration INT NOT NULL,
complete BOOLEAN default 0,
video VARCHAR(255) NOT NULL,
description TEXT,
course_id INT NOT NULL,
FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);


INSERT INTO user (admin, firstname, lastname, email, hashedPassword, profilePicture, aboutSection)
VALUES
(0, 'Marcelo', 'da Silva', 'marcelo@example.com', '$2b$10$4UlN2HIZ2hVX89fyeV/6Zu/4pOYBYExvz9F2RNxszZVWnrKkye.hG', 'url', 'Text about me'),
(1, 'Admin', 'admin', 'admin@mail.com', '$2b$10$XS9w9qWHtvFLazC8k3ensextqzsr69u7FnaMQWSBPO0g8GiX52ioS', 'url', 'Text about me');

INSERT INTO course (title, description, color, initials)
VALUES 
('HTML', 'HTML for begginers', '#DC4A23', 'HTML'),
('CSS', 'CSS for begginers', '#136DB0', 'CSS' ),
('JavaScript', 'JavaScript for beginners', '#EFD81A', 'JS'),
('React Js', 'React js for beginners', '#47CEF6', 'R');


INSERT INTO lesson (lesson_name, duration, complete, video, description, course_id)
VALUES
('HTML Introduction', 40, 0, 'https://www.youtube.com/embed/BrmXGsXNwuo', 'HTML Tutorial for Beginners - Learn HTML for a career in web development. This HTML tutorial teaches you everything you need to get started.', 1),
('CSS Introduction', 40, 0, 'url', 'Text about CSS Lesson', 2),
('Variables', 30, 0, 'url', 'Text about this lesson', 3),
('How JavaScript Works', 40, 0, 'url', 'Text about JavaScript', 3),
('Understandig React Js', 45, 0, 'url', 'Text about React Js lesson', 4),
('Components in React Js', 45, 0, 'url', 'Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML. Components come in two types, Class components and Function components, in this tutorial we will concentrate on Function components.', 4);

SET foreign_key_checks = 1;




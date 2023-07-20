const express = require("express");

const routerLesson = express.Router();

const lessonControllers = require("../controllers/lessonControllers");

routerLesson.get("/lesson", lessonControllers.browse);
routerLesson.get("/lesson/:id", lessonControllers.read);
routerLesson.put("/lesson/:id", lessonControllers.edit);
routerLesson.post("/lesson", lessonControllers.add);
routerLesson.delete("/lesson/:id", lessonControllers.destroy);

module.exports = routerLesson;

const express = require("express");

const routerFinishedLesson = express.Router();

const finishedLessonControllers = require("../controllers/FinishedLessonControllers");

routerFinishedLesson.get("/finishedlesson", finishedLessonControllers.browse);
routerFinishedLesson.get(
  "/finishedlesson/userid/:id",
  finishedLessonControllers.browseFinishedLesson
);
routerFinishedLesson.get("/finishedlesson/:id", finishedLessonControllers.read);
routerFinishedLesson.put("/finishedlesson/:id", finishedLessonControllers.edit);
routerFinishedLesson.post("/finishedlesson", finishedLessonControllers.add);
routerFinishedLesson.delete(
  "/finishedlesson/:id",
  finishedLessonControllers.destroy
);

module.exports = routerFinishedLesson;

const express = require("express");

const routerCourse = express.Router();
const { verifyToken } = require("../services/auth");
const courseControllers = require("../controllers/courseControllers");

routerCourse.use(verifyToken);
routerCourse.get("/course", courseControllers.browse);
routerCourse.get("/course/:id", courseControllers.read);
routerCourse.put("/course/:id", courseControllers.edit);
routerCourse.post("/course", courseControllers.add);
routerCourse.delete("/course/:id", courseControllers.destroy);

module.exports = routerCourse;

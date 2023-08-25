const express = require("express");

const routerUser = express.Router();

const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers");
const auth = require("../services/auth");

routerUser.post("/register", auth.hashPassword, userControllers.add);
routerUser.post(
  "/login",
  authControllers.getUserByEmailMiddleware,
  auth.verifyPassword
);
routerUser.use(auth.verifyToken);
routerUser.get("/currentuser", userControllers.getCurrentUser);
routerUser.get("/logout", auth.logout);
routerUser.put("/upload/avatar/:id", userControllers.editProfilePicture);
routerUser.get("/users", userControllers.browse);
routerUser.get("/users/:id", userControllers.read);
routerUser.put("/users/:id", userControllers.edit);
routerUser.post("/users", userControllers.add);
routerUser.delete("/users/:id", userControllers.destroy);

module.exports = routerUser;

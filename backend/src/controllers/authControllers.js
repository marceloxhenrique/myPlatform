const models = require("../models");

const getUserByEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  models.user
    .findUserByEmailPassword(email)
    .then(([user]) => {
      if (user[0]) {
        [req.user] = user;
        // if user exist, push it to req.user so we can access like req.user.id, req.user.firstname, etc
        // console.log(user);
        next();
      } else {
        console.warn("Mail doesn't exist");
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = { getUserByEmailMiddleware };

const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const models = require("../models");

const upload = multer({ dest: "./public/assets/images/" });

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editProfilePicture = (req, res) => {
  // TODO validations (length, format...)

  // user.id = parseInt(req.params.id, 10);
  upload.single("profilePicture")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    const { filename } = req.file;
    const { originalname } = req.file;
    const filePath = `${uuidv4()}-${originalname}`;
    const destinationPath = `./public/assets/images/${filename}`;
    const path = `./public/assets/images/${filePath}`;
    fs.rename(destinationPath, path, (error) => {
      if (error) throw err;
      res.send("File uploaded");
    });

    const userId = parseInt(req.params.id, 10);
    const user = {
      profilePicture: filePath,
      id: userId,
    };
    models.user.editAvatar(user);
    return undefined;
  });
};

const add = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getCurrentUser = (req, res) => {
  try {
    const token = req.cookies.accesstoken;
    if (!token) return res.sendStatus(403);

    const decode = jwt.decode(token);
    models.user.find(decode.sub).then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    });
    return undefined;
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  editProfilePicture,
  getCurrentUser,
};

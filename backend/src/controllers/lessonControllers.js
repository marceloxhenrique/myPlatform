const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const upload = multer({
  dest: "./public/assets/videos/",
});

const browse = (req, res) => {
  models.lesson
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
  models.lesson
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
const readLessons = (req, res) => {
  models.lesson
    .findLessons(req.params.id)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const lesson = req.body;

  // TODO validations (length, format...)

  lesson.id = parseInt(req.params.id, 10);

  models.lesson
    .update(lesson)
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

const add = (req, res) => {
  upload.single("video")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    const { filename } = req.file;
    const { originalname } = req.file;
    const filePath = `${uuidv4()}-${originalname}`;
    const destinationPath = `./public/assets/videos/${filename}`;
    const path = `./public/assets/videos/${filePath}`;
    fs.rename(destinationPath, path, (error) => {
      if (error) throw err;
      res.send("File uploaded");
    });

    const lesson = {
      video: filePath,
      lesson_name: req.body.lesson_name,
      duration: req.body.duration,
      description: req.body.description,
      course_id: req.body.course_id,
    };
    models.lesson.insert(lesson);
    return undefined;
  });
  // TODO validations (length, format...)
};

const destroy = (req, res) => {
  models.lesson
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

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  readLessons,
};

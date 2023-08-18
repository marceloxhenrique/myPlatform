const AbstractManager = require("./AbstractManager");

class LessonManager extends AbstractManager {
  constructor() {
    super({ table: "lesson" });
  }

  insert(lesson) {
    return this.database.query(
      `INSERT INTO ${this.table} (lesson_name, duration, video, description, course_id ) values (?, ?, ?, ?, ?)`,
      [
        lesson.lesson_name,
        lesson.duration,
        lesson.video,
        lesson.description,
        lesson.course_id,
      ]
    );
  }

  update(lesson) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [lesson.title, lesson.id]
    );
  }

  findLessons(id) {
    return this.database.query(
      `SELECT * FROM  ${this.table} WHERE course_id = ?`,
      [id]
    );
  }
}

module.exports = LessonManager;

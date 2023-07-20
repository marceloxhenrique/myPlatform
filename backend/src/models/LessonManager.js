const AbstractManager = require("./AbstractManager");

class LessonManager extends AbstractManager {
  constructor() {
    super({ table: "lesson" });
  }

  insert(lesson) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      lesson.title,
    ]);
  }

  update(lesson) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [lesson.title, lesson.id]
    );
  }
}

module.exports = LessonManager;

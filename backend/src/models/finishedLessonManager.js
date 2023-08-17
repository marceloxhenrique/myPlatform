const AbstractManager = require("./AbstractManager");

class FinishedlessonManager extends AbstractManager {
  constructor() {
    super({ table: "finished_lesson" });
  }

  insert(finishedLesson) {
    return this.database.query(
      `INSERT INTO ${this.table} (lesson_id, user_id) values (?, ?)`,
      [finishedLesson.lesson_id, finishedLesson.userId]
    );
  }

  update(finishedLesson) {
    return this.database.query(
      `UPDATE ${this.table} SET lesson_id = ?, user_id WHERE id = ?`,
      [finishedLesson.lesson_id, finishedLesson.user_id, finishedLesson.id]
    );
  }

  getFinishedLesson(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [id]
    );
  }
}

module.exports = FinishedlessonManager;

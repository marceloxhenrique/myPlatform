const AbstractManager = require("./AbstractManager");

class CourseManager extends AbstractManager {
  constructor() {
    super({ table: "course" });
  }

  insert(course) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      course.title,
    ]);
  }

  update(course) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [course.title, course.id]
    );
  }
}

module.exports = CourseManager;

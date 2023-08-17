const AbstractManager = require("./AbstractManager");

class CourseManager extends AbstractManager {
  constructor() {
    super({ table: "course" });
  }

  insert(course) {
    return this.database.query(
      `INSERT INTO ${this.table} (title, description, color, initials) values (?, ?, ?, ?)`,
      [course.title, course.description, course.color, course.initials]
    );
  }

  update(course) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ?, description = ?, color = ?, initials = ? WHERE id = ?`,
      [
        course.title,
        course.description,
        course.color,
        course.initials,
        course.id,
      ]
    );
  }
}

module.exports = CourseManager;

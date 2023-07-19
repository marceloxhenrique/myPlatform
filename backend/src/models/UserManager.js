const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, hashedPassword)
      VALUES (?,?,?,?)`,
      [user.firstname, user.lastname, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, email = ?, hashedPassword = ?, profilePicture = ?, aboutSection = ? WHERE id = ${user.id}`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.profilePicture,
        user.aboutSection,
        user.id,
      ]
    );
  }

  findUserByEmailPassword(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }
}

module.exports = UserManager;

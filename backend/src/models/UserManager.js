const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByEmailWithPassword(email) {
    return this.database.query(
      `SELECT id, username, email, hashedPassword, roles FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }
}

module.exports = UserManager;

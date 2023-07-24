const AbstractManager = require("./AbstractManager");

class BudgetManager extends AbstractManager {
  constructor() {
    super({ table: "budget" });
  }

  // méthode pour récupérer tous les budgets d'un user
  getAllBudgets(userId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }

  getBudgetById(budgetId) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE ID = ?`, [
      budgetId,
    ]);
  }

  // Méthode pour créer un nouveau budget
  createBudget(userId, name, amount) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, name, amount) VALUES (?, ?, ?)`,
      [userId, name, amount]
    );
  }

  // Méthode pour mettre à jour les détails d'un budget
  updateBudget(budgetId, name, amount) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, amount = ? WHERE id = ?`,
      [name, amount, budgetId]
    );
  }

  // Méthode pour supprimer un budget
  deleteBudget(budgetId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE ID = ?`, [
      budgetId,
    ]);
  }
}

module.exports = BudgetManager;

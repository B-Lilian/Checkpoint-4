const AbstractManager = require("./AbstractManager");

class ExpenseManager extends AbstractManager {
  constructor() {
    super({ table: "expense" });
  }

  createExpense(budgetId, amount, category) {
    return this.database.query(
      `INSERT INTO ${this.table} (budget_id, amount, category) VALUES (?, ?, ?)`,
      [budgetId, amount, category]
    );
  }

  getAllExpensesByBudgetId(budgetId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE budget_id = ?`,
      [budgetId]
    );
  }

  getExpenseById(expenseId) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      expenseId,
    ]);
  }

  updateExpense(expenseId, amount, category) {
    return this.database.query(
      `UPDATE ${this.table} SET amount = ?, category = ? WHERE id = ?`,
      [amount, category, expenseId]
    );
  }

  deleteExpense(expenseId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      expenseId,
    ]);
  }
}

module.exports = ExpenseManager;

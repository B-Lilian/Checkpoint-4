const models = require("../models");

const createExpense = (req, res) => {
  // eslint-disable-next-line camelcase
  const { budget_id, amount, category } = req.body;
  models.expense
    .createExpense(budget_id, amount, category)
    .then(([result]) => {
      res.location(`/expenses/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllExpensesByBudgetId = (req, res) => {
  const { budgetId } = req.params;
  models.expense
    .getAllExpensesByBudgetId(budgetId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;
  models.expense
    .getExpenseById(expenseId)
    .then(([rows]) => {
      if (rows.length === 0) {
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

const updateExpense = (req, res) => {
  const { amount, category } = req.body;
  const { expenseId } = req.params;
  models.expense
    .updateExpense(expenseId, amount, category)
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

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  models.expense
    .deleteExpense(expenseId)
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
  createExpense,
  getAllExpensesByBudgetId,
  getExpenseById,
  updateExpense,
  deleteExpense,
};

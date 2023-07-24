/* eslint-disable camelcase */
const models = require("../models");

const getAllBudgets = (req, res) => {
  const { userId } = req.params;
  models.budget
    .getAllBudgets(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getBudgetById = (req, res) => {
  const { budgetId } = req.params;

  models.budget
    .getBudgetById(budgetId)
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

const createBudget = (req, res) => {
  const { user_id, name, amount } = req.body;
  models.budget
    .createBudget(user_id, name, amount)
    .then(([result]) => {
      res.location(`/budgets/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateBudget = (req, res) => {
  const { name, amount } = req.body;
  const budgetId = parseInt(req.params.budgetId, 10);
  models.budget
    .updateBudget(budgetId, name, amount)
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

const deleteBudget = (req, res) => {
  const budgetId = parseInt(req.params.budgetId, 10);
  models.budget
    .deleteBudget(budgetId)
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
  getAllBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
};

const express = require("express");

const router = express.Router();

const { getUserByEmailMiddleware } = require("./controllers/authControllers");
const { verifyPassword, verifyToken, logout } = require("./services/auth");

// Public Routes (auth)
router.post("/api/login", getUserByEmailMiddleware, verifyPassword);

// auth requiered
router.use(verifyToken);

const budgetControllers = require("./controllers/budgetControllers");

router.get("/budgets/user/:userId", budgetControllers.getAllBudgets);
router.get("/budgets/:budgetId", budgetControllers.getBudgetById);
router.put("/budgets/:budgetId", budgetControllers.updateBudget);
router.post("/budgets", budgetControllers.createBudget);
router.delete("/budgets/:budgetId", budgetControllers.deleteBudget);

const expenseControllers = require("./controllers/expenseControllers");

router.post("/expenses", expenseControllers.createExpense);
router.get(
  "/expenses/budget/:budgetId",
  expenseControllers.getAllExpensesByBudgetId
);
router.get("/expenses/:expenseId", expenseControllers.getExpenseById);
router.put("/expenses/update/:expenseId", expenseControllers.updateExpense);
router.delete("/expenses/:expenseId", expenseControllers.deleteExpense);

router.get("/api/logout", logout);

module.exports = router;

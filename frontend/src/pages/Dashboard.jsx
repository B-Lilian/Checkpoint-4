import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../services/APIService";
import styles from "./Dashboard.module.css";
import { useUserContext } from "../components/UserContext";

function Dashboard() {
  const [budgets, setBudgets] = useState([]);
  const [showAllBudgets] = useState(false);
  const navigate = useNavigate();

  const { user } = useUserContext();

  const fetchBudgets = async () => {
    try {
      const res = await APIService.get(`/budgets/user/${user.id}`);
      setBudgets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleViewMore = () => {
    navigate("/budgets");
  };

  return (
    <div className={styles["dashboard-container"]}>
      <h1 className={styles["dashboard-title"]}>Dashboard</h1>
      <h2 className={styles["budget-title"]}>List of Budgets</h2>
      <div className={styles["budgets-container"]}>
        <ul className={styles["budget-list"]}>
          {showAllBudgets
            ? budgets.map((budget) => (
                <li key={budget.id} className={styles["budget-item"]}>
                  {budget.name} - {budget.amount}
                </li>
              ))
            : budgets.slice(0, 5).map((budget) => (
                <li key={budget.id} className={styles["budget-item"]}>
                  {budget.name}
                </li>
              ))}
        </ul>
        <button
          type="button"
          className={styles["view-more-button"]}
          onClick={handleViewMore}
        >
          Voir plus
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

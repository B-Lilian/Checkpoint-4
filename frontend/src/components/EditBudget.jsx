import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import APIService from "../services/APIService";
import { useUserContext } from "./UserContext";
import styles from "./EditBudget.module.css";

function EditBudget({ budgetId, onSave }) {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const { user } = useUserContext();

  const fetchBudgetDetails = async () => {
    try {
      const res = await APIService.get(`/budgets/${budgetId}`);
      const budgetData = res.data;
      setBudgetName(budgetData.name);
      setBudgetAmount(budgetData.amount);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du budget :",
        error
      );
    }
  };

  useEffect(() => {
    fetchBudgetDetails();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedBudget = {
      name: budgetName,
      amount: parseFloat(budgetAmount),
      user_id: user.id,
    };

    APIService.put(`/budgets/${budgetId}`, editedBudget)
      .then(() => {
        onSave();
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du budget :", error);
      });
  };

  return (
    <div className={styles["budget-form-container"]}>
      <h2 className={styles["form-title"]}>Modifier le budget</h2>
      <form className={styles["budget-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="budgetName" className={styles["form-label"]}>
            Nom du budget:
          </label>
          <input
            type="text"
            id="budgetName"
            className={styles["form-input"]}
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="budgetAmount" className={styles["form-label"]}>
            Montant du budget:
          </label>
          <input
            type="number"
            id="budgetAmount"
            className={styles["form-input"]}
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
          />
        </div>
        <button type="submit" className={styles["form-button"]}>
          Enregistrer
        </button>
      </form>
    </div>
  );
}

EditBudget.propTypes = {
  budgetId: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditBudget;

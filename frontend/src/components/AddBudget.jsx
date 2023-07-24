import React, { useState } from "react";
import PropTypes from "prop-types";
import APIService from "../services/APIService";
import { useUserContext } from "./UserContext";

function AddBudget({ onAdd }) {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const { user } = useUserContext();

  const handleAddBudget = () => {
    const newBudget = {
      name: budgetName,
      amount: parseFloat(budgetAmount),
      user_id: user.id,
    };

    APIService.post("/budgets", newBudget)
      .then(() => {
        onAdd();
        setBudgetName("");
        setBudgetAmount("");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du budget :", error);
      });
  };

  return (
    <div>
      <h2>Ajouter un budget</h2>
      <label htmlFor="budgetName">Nom du budget:</label>
      <input
        type="text"
        id="budgetName"
        value={budgetName}
        onChange={(e) => setBudgetName(e.target.value)}
      />

      <label htmlFor="budgetAmount">Montant du budget:</label>
      <input
        type="number"
        id="budgetAmount"
        value={budgetAmount}
        onChange={(e) => setBudgetAmount(e.target.value)}
      />
      <button type="button" onClick={handleAddBudget}>
        Ajouter
      </button>
    </div>
  );
}

AddBudget.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddBudget;

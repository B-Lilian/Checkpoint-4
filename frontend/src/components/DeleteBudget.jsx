import React from "react";
import PropTypes from "prop-types";
import APIService from "../services/APIService";

function DeleteBudget({ budgetId, onDelete }) {
  const handleDelete = (isConfirmed) => {
    if (isConfirmed) {
      APIService.delete(`/budgets/${budgetId}`)
        .then(() => {
          onDelete();
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du budget :", error);
        });
    }
  };

  return (
    <div>
      <h1>Supprimer ce budget ?</h1>
      <button type="button" onClick={handleDelete}>
        Oui
      </button>
      <button type="button">Non</button>
    </div>
  );
}

DeleteBudget.propTypes = {
  budgetId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteBudget;

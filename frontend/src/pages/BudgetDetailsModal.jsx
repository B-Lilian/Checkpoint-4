import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import APIService from "../services/APIService";

function BudgetDetailsModal({ budgetId, onClose }) {
  const [budgetDetails, setBudgetDetails] = useState(null);

  const fetchBudgetDetails = async () => {
    try {
      const res = await APIService.get(`/budgets/${budgetId}`);
      setBudgetDetails(res.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du budget :",
        error
      );
    }
  };

  useEffect(() => {
    fetchBudgetDetails();
  }, [budgetId]);

  return (
    <div>
      {budgetDetails ? (
        <>
          <h2>Détails du budget</h2>
          <p>Nom du budget: {budgetDetails.name}</p>
          <p>Montant du budget: {budgetDetails.amount}</p>
          {/* Ajoutez ici d'autres détails du budget si nécessaire */}
        </>
      ) : (
        <p>Chargement des détails du budget...</p>
      )}
      <button type="button" onClick={onClose}>
        Fermer
      </button>
    </div>
  );
}

BudgetDetailsModal.propTypes = {
  budgetId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BudgetDetailsModal;

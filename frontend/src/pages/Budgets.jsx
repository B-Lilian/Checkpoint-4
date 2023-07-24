import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete-button.svg";
import backIcon from "../assets/left-arrow.svg";
import editIcon from "../assets/edit-button.svg";
import APIService from "../services/APIService";
import Modal from "./Modal";
import AddBudget from "../components/AddBudget";
import DeleteBudget from "../components/DeleteBudget";
import EditBudget from "../components/EditBudget";
import BudgetDetailsModal from "./BudgetDetailsModal";
import styles from "./Budgets.module.css";
import { useUserContext } from "../components/UserContext";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [isShow, setIsShow] = useState({
    modalAdd: false,
    modalDelete: false,
    modalEdit: false,
    modalBudgetDetails: false,
  });
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
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
  }, [isShow]);

  const handleGoBack = () => {
    navigate("/admin/dashboard");
  };

  const handleBudgetClick = (budgetId) => {
    setSelectedBudgetId(budgetId);
    setIsShow({ ...isShow, modalBudgetDetails: true });
  };

  const handleEditClick = (budgetId) => {
    setSelectedBudgetId(budgetId);
    setIsShow({ ...isShow, modalEdit: true });
  };

  const handleDeleteClick = (budgetId) => {
    setSelectedBudgetId(budgetId);
    setIsShow({ ...isShow, modalDelete: true });
  };

  return (
    <main className={styles["budgets-container"]}>
      <div className={styles["header-page"]}>
        <h1 className={styles["budgets-title"]}>Gestion des budgets</h1>
        <div className={styles["header-button"]}>
          <button
            type="button"
            onClick={handleGoBack}
            className={styles["back-button-container"]}
          >
            <img
              src={backIcon}
              className={styles["back-button"]}
              alt="back-button"
            />
          </button>
          <button
            type="button"
            onClick={() => setIsShow({ ...isShow, modalAdd: true })}
            className={styles["add-button-desktop"]}
          >
            Ajouter
          </button>
        </div>
      </div>
      <div className={styles["budgets-list-container"]}>
        <div className={styles["budget-list"]}>
          {budgets.map((budget) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              key={budget.id}
              className={styles["budget-item"]}
              onClick={() => handleBudgetClick(budget.id)}
            >
              <div className={styles["budget-info-container"]}>
                {budget.name}
              </div>
              <div className={styles["buttons-container"]}>
                <button
                  type="button"
                  className={styles["budget-button"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(budget.id);
                  }}
                >
                  <img
                    src={editIcon}
                    className={styles["edit-button"]}
                    alt="modifier"
                  />
                </button>
                <button
                  type="button"
                  className={styles["budget-button"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(budget.id);
                  }}
                >
                  <img
                    src={deleteIcon}
                    className={styles["delete-button"]}
                    alt="supprimer"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles["button-container"]}>
          <button
            type="button"
            onClick={() => setIsShow({ ...isShow, modalAdd: true })}
            className={styles["add-button"]}
          >
            Ajouter
          </button>
        </div>
      </div>
      {isShow.modalAdd && (
        <Modal onClose={() => setIsShow({ ...isShow, modalAdd: false })}>
          <AddBudget
            onAdd={() => {
              setIsShow({ ...isShow, modalAdd: false });
              fetchBudgets();
            }}
          />
        </Modal>
      )}

      {isShow.modalEdit && selectedBudgetId && (
        <Modal onClose={() => setIsShow({ ...isShow, modalEdit: false })}>
          <EditBudget
            budgetId={selectedBudgetId}
            onSave={() => {
              setIsShow({ ...isShow, modalEdit: false });
              fetchBudgets();
            }}
          />
        </Modal>
      )}

      {isShow.modalDelete && selectedBudgetId && (
        <Modal onClose={() => setIsShow({ ...isShow, modalDelete: false })}>
          <DeleteBudget
            budgetId={selectedBudgetId}
            onDelete={() => {
              setIsShow({ ...isShow, modalDelete: false });
              fetchBudgets();
            }}
          />
        </Modal>
      )}

      {isShow.modalBudgetDetails && selectedBudgetId && (
        <Modal
          onClose={() => setIsShow({ ...isShow, modalBudgetDetails: false })}
        >
          <BudgetDetailsModal
            budgetId={selectedBudgetId}
            onClose={() => setIsShow({ ...isShow, modalBudgetDetails: false })}
          />
        </Modal>
      )}
    </main>
  );
}

export default Budgets;

import React, { useEffect } from 'react';
import { useExpensesContext } from "../hooks/useExpensesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ExpenseForm from '../components/ExpenseForm';
import ExpenseDetails from '../components/ExpenseDetails';

const NewPage = () => {
  const { expenses, dispatch } = useExpensesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch('http://localhost:4000/api/expenses', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_EXPENSES', payload: json });
      }
    };

    if (user) {
      fetchExpenses();
    }
  }, [dispatch, user]);

  return (
    <div className="new-page-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <ExpenseForm />
      </div>
      <div style={{ flex: 1 }}>
        {/* Assuming you want to display all expenses like in Home, map through them */}
        {expenses && expenses.map((expense) => (
          <ExpenseDetails key={expense._id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default NewPage;

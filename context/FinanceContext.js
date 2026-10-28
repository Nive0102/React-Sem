import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

const FinanceContext = createContext();

const initialTransactions = [
  {
    id: '1',
    title: 'Grocery Shopping',
    category: 'Food',
    amount: 850,
    type: 'Expense',
    month: 'October',
    date: '2026-10-28',
  },
  {
    id: '2',
    title: 'Monthly Salary',
    category: 'Salary',
    amount: 25000,
    type: 'Income',
    month: 'October',
    date: '2026-10-28',
  },
  {
    id: '3',
    title: 'Bus Travel',
    category: 'Transport',
    amount: 150,
    type: 'Expense',
    month: 'October',
    date: '2026-10-27',
  },
  {
    id: '4',
    title: 'Movie Ticket',
    category: 'Entertainment',
    amount: 300,
    type: 'Expense',
    month: 'October',
    date: '2026-10-26',
  },
  {
    id: '5',
    title: 'House Rent',
    category: 'Rent',
    amount: 8000,
    type: 'Expense',
    month: 'October',
    date: '2026-10-10',
  },
  {
    id: '6',
    title: 'Freelance Project',
    category: 'Freelance',
    amount: 5000,
    type: 'Income',
    month: 'October',
    date: '2026-10-05',
  },
  {
    id: '7',
    title: 'Shopping',
    category: 'Shopping',
    amount: 2000,
    type: 'Expense',
    month: 'September',
    date: '2026-09-25',
  },
];

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [user, setUser] = useState({
    name: 'Nivetha',
    email: 'nivetha@gmail.com',
    role: 'Customer',
  });

  const income = transactions
    .filter(item => item.type === 'Income')
    .reduce((total, item) => total + item.amount, 0);

  const expense = transactions
    .filter(item => item.type === 'Expense')
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expense;

  function addTransaction(transaction) {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString().slice(0, 10),
    };

    setTransactions(previous => [newTransaction, ...previous]);

    Alert.alert(
      'Transaction Updated',
      `${transaction.title} added successfully!`
    );
  }

  function updateProfile(name, email) {
    setUser(previous => ({ ...previous, name, email }));
    Alert.alert('Success', 'Profile updated successfully!');
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        setTransactions,
        addTransaction,
        user,
        setUser,
        updateProfile,
        income,
        expense,
        balance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}
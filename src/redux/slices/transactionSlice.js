import { createSlice } from "@reduxjs/toolkit";
import {
  getAllTransactions,
  saveTransaction,
} from "../actions/transactionActions";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: getAllTransactions(),
  },
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      saveTransaction(state.transactions);
    },

    editTransaction: (state, action) => {
      state.transactions = state.transactions.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return { ...transaction, ...action.payload };
        }
        return transaction;
      });
      saveTransaction(state.transactions);
    },

    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
      saveTransaction(state.transactions);
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;

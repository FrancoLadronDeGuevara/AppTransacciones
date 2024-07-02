import { defaultTransactions } from "../../utils/defaultTransactions";

export const getAllTransactions = () => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    if (!transactions) {
        localStorage.setItem("transactions", JSON.stringify(defaultTransactions));
        return defaultTransactions;
    }
    return transactions;
};

export const saveTransaction = (transactions) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
};

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });
  const { userID } = useGetUserInfo();

  const transactionCollectionsRef = collection(db, "transactions");

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionsRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        setTransactions(docs);

        let balance = totalIncome - totalExpenses;
        setTransactionTotal({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });
      });
    } catch (error) {
      console.error(error);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions ,transactionTotal};
};

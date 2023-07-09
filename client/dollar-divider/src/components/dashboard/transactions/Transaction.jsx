import { useEffect, useState } from "react";
import RecentTransactions from "./recentTransactions/RecentTransactions";
import React from "react";
export default function Transaction(props) {
  // let url;
  // const [transaction, setTransaction] = useState([]);
  
  // const getTransaction = async () => {
  //   let viewValue = props.view;
  //   if (viewValue === true) {
  //     url = "http://localhost:4000/transaction/household";
  //   } else {
  //     url = "http://localhost:4000/transaction/mine";
  //   }
  //   const reqOptions = {
  //     method: "GET",
  //     headers: new Headers({
  //       Authorization: props.token,
  //     }),
  //   };
  //   try {
  //     const res = await fetch(url, reqOptions);
  //     const data = await res.json();
  //     // If the server does not provide a failure message
  //     if (data.message !== "No transactions found.") {
  //       setTransaction(data.getAllTransactions);
  //     } else {
  //       setTransaction(null);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // Get Transaction UseEffect
  useEffect(() => {
    if (props.token) {
      props.getTransaction();
    }
  }, [props.token, props.view]);
  // console.log("transactionprops",props)
  return (
    <>
      <RecentTransactions
        // transaction = {props.transaction} token={props.token} view={props.view} accounts = {props.accounts}             category = {props.category}
        transaction={props.transaction}
        token={props.token}
        view={props.view}
        accounts={props.accounts}
        // category={props.category}
        getTransaction={props.getTransaction}
        getBudgets={props.getBudgets}
        budgets={props.budgets}
      />
    </>
  );
}

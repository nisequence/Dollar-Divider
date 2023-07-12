import { useEffect, useState } from "react";
import RecentTransactions from "./recentTransactions/RecentTransactions";
export default function Transaction(props) {
  let url;
  const [transaction, setTransaction] = useState([]);
  const getTransaction = async () => {
    // console.log("view",props.view)
    let viewValue = props.view;
    if (viewValue === true) {
      url = "http://localhost:4000/transaction/household";
    } else {
      url = "http://localhost:4000/transaction/mine";
    }
    // console.log("url",url)
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // If the server does not provide a failure message
      if (data.message !== "No transactions found.") {
        setTransaction(data.getAllTransactions);
      } else {
        setTransaction(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      props.getTransaction(); // this one updates the chart
      getTransaction() // This one updates the transaction list
    }
  }, [props.token, props.view]);

  return (
    <>
      <br />
      <RecentTransactions
        transaction={transaction}
        token={props.token}
        view={props.view}
        accounts={props.accounts}
        getTransaction={props.getTransaction}
        budgets={props.budgets}
        getAccounts = {props.getAccounts}
        getBudgets = {props.getBudgets}
        // setTransaction = {props.setTransaction}
      />
    </>
  );
}

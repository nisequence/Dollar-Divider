import React from "react";
import CurrentBudgetStatus from "./currentBudgetStatus/CurrentBudgetStatus";
import { useState, useEffect } from "react";
import AddBudget from "./currentBudgetStatus/AddBudget/AddBudget";

export default function Budgets(props) {
  let url;
  const [budgets, setBudgets] = useState([]);
  const getBudgets = async (viewValue) => {
    if (viewValue == true) {
      url = "http://localhost:4000/budget/household";
    } else {
      url = "http://localhost:4000/budget/mine";
    }
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
      if (data.message !== "No personal budgets found.") {
        setBudgets(data.allBudgets);
      } else {
        setBudgets(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      getBudgets(props.view);
    }
  }, [props.token, props.view]);
  return (
    <>
      <CurrentBudgetStatus
        getBudgets={getBudgets}
        budgets={budgets}
        transactions={props.transactions}
        token={props.token}
        view={props.view}
      />
    </>
  );
}

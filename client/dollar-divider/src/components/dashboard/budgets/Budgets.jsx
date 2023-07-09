import React from "react";
import CurrentBudgetStatus from "./currentBudgetStatus/CurrentBudgetStatus";
import { useState, useEffect } from "react";

export default function Budgets(props) {
  let url;
  const [budgets, setBudgets] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = async (data) => {
    let totalToDivide = 0;
    for (let x = 0; x < data?.length; x++) {
      let thisOne = data[x].budgetAmt;
      totalToDivide += thisOne;
    }
    setTotal(totalToDivide);
  };

  const setHouseholdTotal = async (data) => {
    let totalToDivide = 0;
    for (let x = 0; x < data?.length; x++) {
      let thisOne = data[x].budgetAmt;
      totalToDivide += thisOne;
    }
    // console.log("View set to", props.view, "setting total to", totalToDivide);
    sessionStorage.setItem("Total", totalToDivide);
  };

  const getBudgets = async () => {
    let viewValue = props.view;
    if (viewValue === true) {
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
      if (data.message === "Budget(s) found!") {
        setBudgets(data.allBudgets);
        if (
          viewValue === true &&
          url === "http://localhost:4000/budget/household"
        ) {
          setHouseholdTotal(data.allBudgets);
        }
        calculateTotal(data.allBudgets);
      } else {
        setBudgets(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      getBudgets();
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
        totalToDisplay={total}
      />
    </>
  );
}

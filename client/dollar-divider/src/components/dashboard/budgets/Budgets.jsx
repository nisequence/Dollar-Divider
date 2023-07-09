import React from "react";
import CurrentBudgetStatus from "./currentBudgetStatus/CurrentBudgetStatus";
import { useState, useEffect } from "react";

export default function Budgets(props) {
  let url;
<<<<<<< HEAD
  // const [budgets, setBudgets] = useState([]);

  // const setHouseholdTotal = async (data) => {
  //   let totalToDivide = 0;
  //   for (let x = 0; x < data?.length; x++) {
  //     let thisOne = data[x].budgetAmt;
  //     totalToDivide += thisOne;
  //   }
  //   // console.log("View set to", props.view, "setting total to", totalToDivide);
  //   sessionStorage.setItem("Total", totalToDivide);
  // };
=======
  const [budgets, setBudgets] = useState([]);
  const [total, setTotal] = useState();

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
>>>>>>> 093c00ce704c49001fa000c34ae6d076c30fa70e

  // const getBudgets = async () => {
  //   let viewValue = props.view;
  //   if (viewValue === true) {
  //     url = "http://localhost:4000/budget/household";
  //   } else {
  //     url = "http://localhost:4000/budget/mine";
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

<<<<<<< HEAD
  //     // If the server does not provide a failure message
  //     if (data.message === "Budget(s) found!") {
  //       setBudgets(data.allBudgets);
  //       if (
  //         viewValue === true &&
  //         url === "http://localhost:4000/budget/household"
  //       ) {
  //         setHouseholdTotal(data.allBudgets);
  //       }
  //     } else {
  //       setBudgets(null);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
=======
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
>>>>>>> 093c00ce704c49001fa000c34ae6d076c30fa70e

  useEffect(() => {
    if (props.token) {
      props.getBudgets();
    }
  }, [props.token, props.view]);
// console.log("props.transactions",props)
  return (
    <>
      <CurrentBudgetStatus
        getBudgets={props.getBudgets}
        budgets={props.budgets}
        transactions={props.transactions}
        transaction={props.transaction}
        getTransaction = {props.getTransaction}
        token={props.token}
        view={props.view}
        totalToDisplay={total}
      />
    </>
  );
}

import React from "react";
import CurrentBudgetStatus from "./currentBudgetStatus/CurrentBudgetStatus";
import { useState, useEffect } from "react";

export default function Budgets(props) {
  //* State to house room data
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
        //! Send to 404 page
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const getPersonalBudgets = async () => {
  //   let url = "http://localhost:4000/budget/mine";

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
  //     if (data.message !== "No personal budgets found.") {
  //       setBudgets(data.allBudgets);
  //     } else {
  //       //! Send to 404 page
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  useEffect(() => {
    if (props.token) {
      getBudgets(props.view);
    }
  }, [props.token, props.view]);
  return (
    <>
      <CurrentBudgetStatus
        budgets={budgets}
        transactions={props.transactions}
      />
    </>
  );
}

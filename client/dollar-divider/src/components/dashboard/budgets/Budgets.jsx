import React from "react";
import CurrentBudgetStatus from "./currentBudgetStatus/CurrentBudgetStatus";
import { useState, useEffect } from "react";
export default function Budgets(props) {
  //* State to house room data
  const [budgets, setBudgets] = useState([]);

  const getBudgets = async () => {
    let url = "localhost:4000/budget/mine";

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
        // save all the rooms
        setBudgets(data.allBudgets);
        console.log(data)
      } else {
        //! Send to 404 page
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      getBudgets();
    }
  }, [props.token]);
  return (
    <>
      <CurrentBudgetStatus budgets = {getBudgets}/>
    </>
  );
}

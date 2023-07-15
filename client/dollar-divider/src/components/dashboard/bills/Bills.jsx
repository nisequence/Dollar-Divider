import React, { useState, useEffect } from "react";
import Calendar from "./Calendar/Calendar";

export default function Bills(props) {
  // console.log("billsprops",props)
  let url;
  const [bills, setBills] = useState([]);
  const getBills = async () => {
    let viewValue = props.view;
    if (viewValue === true) {
      url = "http://localhost:4000/bills/household";
    } else {
      url = "http://localhost:4000/bills/mine";
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
      if (data.message !== "No bills found.") {
        setBills(data.getAllBills);
      } else {
        setBills(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      getBills();
    }
  }, [props.token, props.view]);

  return (
    <div className="upcomingBills">
      <Calendar
        bills={bills}
        token={props.token}
        view={props.view}
        getBills={getBills}
        getBudgets={props.getBudgets}
        getTransaction={props.getTransaction}
        getAccounts={props.getAccounts}
        setTransaction={props.setTransaction}
      />
    </div>
  );
}

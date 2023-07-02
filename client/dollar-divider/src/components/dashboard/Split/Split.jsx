import React, { useEffect } from "react";
import Solo from "./Solo/Solo";
import Grouped from "./Grouped/Grouped";

export default function Split(props) {
  const total = localStorage.getItem("Total");
  const status = localStorage.getItem("Status");
  const users = localStorage.getItem("Users");
  const percents = localStorage.getItem("Percents");

  const returnView = () => {
    console.log("Total Budgeted:", total);
    console.log("User Status:", status);
    console.log("Info", users, percents);
    if (status === "Solo") {
      // tell user they have no household
      return <Solo />;
    } else {
      return <Grouped />;
    }
  };

  useEffect(() => {
    if (props.view) {
      returnView();
    }
  }, [props.token, props.view]);

  return <>{returnView()}</>;
}

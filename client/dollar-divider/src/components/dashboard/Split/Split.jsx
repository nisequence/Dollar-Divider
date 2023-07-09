import React, { useEffect, useState } from "react";
import Solo from "./Solo/Solo";
import SplitFunction from "./SplitFunction";

export default function Split(props) {
  const status = sessionStorage.getItem("Status");

  //   let total = sessionStorage.getItem("Total");
  //   console.log("Split.jsx total", total);
  //   let users = sessionStorage.getItem("Users");
  //   let percents = sessionStorage.getItem("Percents");
  //   console.log("Split.jsx percents", percents);
  //   let IDs = sessionStorage.getItem("IDs");
  //   console.log("Users, Percents, IDs", users, percents, IDs);

  const returnView = () => {
    if (status === "Solo") {
      // tell user they have no household
      return <Solo />;
    } else {
      if (status !== "Solo") {
        return (
          <>
            <SplitFunction
              token={props.token}
              view={props.view}
              transactions={props.transactions}
            />
          </>
        );
      }
    }
  };

  useEffect(() => {
    if (props.token) {
      returnView();
    }
  }, [props.token, props.view, props.transactions]);

  return <>{returnView()}</>;
}

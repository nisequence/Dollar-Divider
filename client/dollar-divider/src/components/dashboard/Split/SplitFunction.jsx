import React, { useEffect, useState } from "react";
import Grouped from "./Grouped/Grouped";

export default function SplitFunction(props) {
  let total = sessionStorage.getItem("Total");
  //   console.log("Split.jsx total", total);
  let users = sessionStorage.getItem("Users");
  let percents = sessionStorage.getItem("Percents");
  let IDs = sessionStorage.getItem("IDs");
  //   console.log("Users, Percents, IDs", users, percents, IDs);
  //   console.log(sessionStorage);

  const getInfo = () => {
    let populate = [];
    let checkTotal = sessionStorage.getItem("Total");
    let checkUsers = sessionStorage.getItem("Users");
    let checkPercents = sessionStorage.getItem("Percents");
    console.log(checkPercents);
    let checkIDs = sessionStorage.getItem("IDs");
    const newTotal = Number(checkTotal);
    console.log("NewTotal", newTotal);
    const percentArray = checkPercents?.split(",");
    const userArray = checkUsers?.split(",");
    const idArray = checkIDs?.split(",");
    for (let u = 0; u < userArray?.length; u++) {
      let percentNum = Number(percentArray[u]);
      let owed = (percentNum * newTotal) / 100;
      populate.push({
        id: u,
        userID: idArray[u],
        name: userArray[u],
        owes: owed.toFixed(2),
      });
    }
    // console.log(populate);
    return populate;
  };

  useEffect(() => {
    if (props.token) {
      if (props.view === true) {
        getInfo();
        console.log("I should get new cards now!");
      }
    }
  }, [props.token, props.view, total, percents, users, IDs]);

  return (
    <>
      <br />
      <h4 id="splitFunction">Household Contributions</h4>
      <Grouped
        token={props.token}
        view={props.view}
        cardInfo={getInfo()}
        reactivate={getInfo}
        transactions={props.transactions}
      />
    </>
  );
}

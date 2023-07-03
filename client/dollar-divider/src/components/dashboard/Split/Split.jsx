import React, { useEffect, useState } from "react";
import Solo from "./Solo/Solo";
import Grouped from "./Grouped/Grouped";

export default function Split(props) {
  const status = localStorage.getItem("Status");
  const total = localStorage.getItem("Total");
  const newTotal = Number(total);
  // console.log(newTotal); // coming in as a number now

  const users = localStorage.getItem("Users");
  const userArray = users.split(",");
  //   console.log(userArray);
  const percents = localStorage.getItem("Percents");
  const percentArray = percents.split(",");
  //   console.log(percentArray);
  //!  console.log(typeof users); // both coming in as a string
  //! need to separate into arrays

  const [cardInfo, setCardInfo] = useState(userArray);
  const allUserInfo = () => {
    let populate = [];
    for (let u = 0; u < userArray?.length; u++) {
      let percentNum = Number(percentArray[u]);
      let owed = (percentNum * newTotal) / 100;
      let paid = 0;
      populate.push({
        id: u,
        name: userArray[u],
        owes: owed.toFixed(2),
        contribution: paid.toFixed(2),
        remainder: (owed - paid).toFixed(2),
      });
      console.log("In func", populate);
    }
    console.log(populate);
    setCardInfo(populate);
    return populate;
  };

  const returnView = () => {
    if (status === "Solo") {
      // tell user they have no household
      return <Solo />;
    } else {
      return (
        <Grouped token={props.token} view={props.view} cardInfo={cardInfo} />
      );
    }
  };

  useEffect(() => {
    if (props.view) {
      allUserInfo();
      returnView();
    }
  }, [props.token, props.view]);

  return <>{returnView()}</>;
}

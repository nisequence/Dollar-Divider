import React, { useState, useEffect } from "react";
import {
  Button,
  PopoverHeader,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";
import NewInfo from "./NewInfo/NewInfo";

export default function AddBill(props) {
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
      if (data.message == "Budget(s) found!") {
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
      <Button
        id="UncontrolledPopoverAddBill"
        color="success"
        type="button"
        style={{
          maxWidth: "4vw",
          display: "inline-block",
        }}
      >
        +
      </Button>
      <UncontrolledPopover
        placement="bottom"
        target="UncontrolledPopoverAddBill"
        trigger="legacy"
      >
        <PopoverHeader>Add New Bill</PopoverHeader>
        <PopoverBody>
          <NewInfo
            getBills={props.getBills}
            token={props.token}
            view={props.view}
            month={props.month}
            budgets={budgets}
            getBudgets={getBudgets}
          />
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}

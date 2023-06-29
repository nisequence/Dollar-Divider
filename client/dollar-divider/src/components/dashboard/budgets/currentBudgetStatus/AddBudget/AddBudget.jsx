import React from "react";
import {
  Button,
  PopoverHeader,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";
import NewInfo from "./NewInfo/NewInfo";

export default function AddBudget(props) {
  const status = localStorage.getItem("Status");
  // console.log(status);

  let canAdd;
  //! Working to only display the option when the person is admin or viewing personal info
  if (props.view == "personal" || status == "Admin") {
    canAdd = true;
  } else {
    canAdd = false;
  }
  return (
    <>
      <Button id="UncontrolledPopoverBudget" color="success" type="button">
        +
      </Button>
      <UncontrolledPopover
        placement="bottom"
        target="UncontrolledPopoverBudget"
        trigger="legacy"
      >
        <PopoverHeader>Add New Budget</PopoverHeader>
        <PopoverBody>
          <NewInfo
            getBudgets={props.getBudgets}
            token={props.token}
            view={props.view}
          />
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}

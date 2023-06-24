import React from "react";
import {
  Button,
  PopoverHeader,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";
import NewInfo from "./NewInfo/NewInfo";

export default function AddBudget(props) {
  return (
    <>
      <Button id="UncontrolledPopover" color="success" type="button">
        +
      </Button>
      <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
        <PopoverHeader>Add New Budget</PopoverHeader>
        <PopoverBody>
          <NewInfo token={props.token} view={props.view} />
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}

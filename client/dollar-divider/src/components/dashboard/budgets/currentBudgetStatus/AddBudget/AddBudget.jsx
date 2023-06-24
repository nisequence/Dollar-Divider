import React from "react";
import {
  Button,
  PopoverHeader,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";

export default function AddBudget(props) {
  return (
    <>
      <br></br>
      <Button id="UncontrolledPopover" color="success" type="button">
        +
      </Button>
      <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>
          Sed posuere consectetur est at lobortis. Aenean eu leo quam.
          Pellentesque ornare sem lacinia quam venenatis vestibulum.
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}

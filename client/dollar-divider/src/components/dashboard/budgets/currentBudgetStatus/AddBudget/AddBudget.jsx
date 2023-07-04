import React, { useState } from "react";
import {
  Button,
  PopoverHeader,
  UncontrolledPopover,
  PopoverBody,
  Tooltip,
} from "reactstrap";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdPostAdd } from "react-icons/md";
import NewInfo from "./NewInfo/NewInfo";

export default function AddBudget(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <Button id="UncontrolledPopoverBudget" color="success" type="button">
        <MdPostAdd />
      </Button>
      <Tooltip
        isOpen={tooltipOpen}
        target="UncontrolledPopoverBudget"
        toggle={toggle}
      >
        Add a new budget here!
      </Tooltip>
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

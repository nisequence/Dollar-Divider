import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  Alert,
  Tooltip
} from "reactstrap";
import { GrEdit } from "react-icons/gr";
import UpdateBudgets from "../EditBudgets/UpdateBudgets";

export default function Selector(props) {
  const categoryOptions = props.budgets;
  const choiceRef = useRef();
  const [chosen, setChosen] = useState("");
  const [modal, setModal] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleToolTip = () => setTooltipOpen(!tooltipOpen);

  const openBudget = async (e) => {
    e.preventDefault();

    setChosen(choiceRef.current.value);

    if (modal === true) {
      // alert("Please Select a Budget Category.")
      //do nothing
    } else {
      toggle();
    }
  };
  // toggle();
  const displayModal = () => {
    //* Make sure user is authorized as Admin
    //* Globalize the variable "selected" within this function
    let selected = null;
    //* Go through each budget item
    for (let i = 0; i < props.budgets?.length; i++) {
      // If we run across one whose name matches the chosen budget
      if (props.budgets[i].budgetCat === chosen) {
        // set this object to the selected variable
        selected = props.budgets[i];
      }
    }
    if (selected !== null) {
      //* ONLY if we found the budget, we can return the modal
      return (
        <>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Viewing {chosen} Budget</ModalHeader>
            <UpdateBudgets
              token={props.token}
              toggleToolTip={toggleToolTip}
              toggle={toggle}
              view={props.view}
              getBudgets={props.getBudgets}
              budget={selected}
              // budgets={props.budgets}
              categoryOptions={categoryOptions}
              /*             toggle={toggle} */
              modal={modal}
            />
          </Modal>
        </>
      );
    }
  };

  return (
    <>
      <hr />
      {/* <Row id="EditBudgetHeader">
        <h5>Select a Budget Category:</h5>
      </Row> */}
      <Form>
        <Row id="BudgetEditDropdown">
          <Col>
            {" "}
            <FormGroup>
              <Input
                id="exampleSelect2"
                name="select"
                type="select"
                placeholder="Select"
                required
                innerRef={choiceRef}
              >
                <option value="" disabled selected>
                  Select a budget
                </option>
                {categoryOptions?.map((each) => {
                  return (
                    <option key={categoryOptions.indexOf(each)}>
                      {each.budgetCat}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <Button id="submit" className="editBudgetBtn" color="secondary" onClick={openBudget}>
              <GrEdit /> Edit Budget
            </Button>
            <Tooltip
              isOpen={tooltipOpen}
              target="submit"
              // target="editBudgetBtn"
              toggle={toggleToolTip}
            >
              Please Select a Budget
            </Tooltip>
          </Col>
        </Row>
      </Form>
      {displayModal()}
    </>
  );
}

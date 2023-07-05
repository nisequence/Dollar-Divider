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
} from "reactstrap";
import { GrEdit } from "react-icons/gr";
import UpdateBudgets from "../EditBudgets/UpdateBudgets";

export default function Selector(props) {
  let categoryOptions = props.budgets;
  const choiceRef = useRef();
  const [chosen, setChosen] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  console.log(props.budgets) // Passing array of objects

  const openBudget = async (e) => {
    e.preventDefault();

    setChosen(choiceRef.current.value);
    console.log(chosen);

    if (modal === true) {
      //do nothing
    } else {
      toggle();
    }
    console.log(modal);
  };
  console.log(chosen);
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
              toggle={toggle}
              view={props.view}
              getBudgets={props.getBudgets}
              budget={selected}
              budgets={props.budgets}
              
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
      <Row>
        <Form>
          <Col>
          <div id="selectBudgetCategory">
            <FormGroup>
            <h5>Choose a Budget Category:</h5>
              <Input
                id="exampleSelect2"
                name="select"
                type="select"
                required
                innerRef={choiceRef}
              >
                {categoryOptions?.map((each) => {
                  return (
                    <option key={categoryOptions.indexOf(each)}>
                      {each.budgetCat}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            </div>
          </Col>
          <Col>
            <Button id="submit" color="secondary" onClick={openBudget}>
              <GrEdit /> Edit Budget
            </Button>
            {/*             {chooseBudget}
             */}{" "}
          </Col>
        </Form>
      </Row>
      {displayModal()}
    </>
  );
}

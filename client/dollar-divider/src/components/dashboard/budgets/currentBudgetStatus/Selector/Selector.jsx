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
import UpdateBudgets from "../EditBudgets/UpdateBudgets";

export default function Selector(props) {
  let categoryOptions = props.budgets;
  const choiceRef = useRef();
  const [chosen, setChosen] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const openBudget = async (e) => {
    e.preventDefault();

    setChosen(choiceRef.current.value);
    
    if (modal === true) {
      //do nothing
    } else {
      toggle();
    }
    console.log(modal);
  };
console.log(chosen);
  const displayModal = () => {
    return (
      <>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Viewing {chosen} Budget</ModalHeader>
          <UpdateBudgets
            token={props.token}
            view={props.view}
            getBudgets={props.getBudgets}
            budget={props.budgets?.indexOf(chosen)} //! Not working the way we had hoped. Only grabbing string of budget and not object that can be looked into for category or amount in UpdateBudget and DeleteBudget
            budgetA={props.budgets}
            /*             toggle={toggle} */
            modal={modal}
          />
        </Modal>
      </>
    );
  };

  return (
    <>
      <Row>
        <Form>
          <Col>
            <FormGroup>
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
          </Col>
          <Col>
            <Button id="submit" color="secondary" onClick={openBudget}>
              Update Budget
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

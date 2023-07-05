import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  ModalBody,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";
import DeleteBudget from "./Each/DeleteBudget";

//* EDIT AND DELETE BUTTONS

export default function UpdateBudgets(props) {
  let budgetInfo = props.budget;
  let budgetID = budgetInfo._id;
  let id=budgetID

  console.log(budgetID)

  // const budgetCatRef = useRef(); // dropdown
  const budgetAmtRef = useRef();
  // const assignedUserRef = useRef(); // dropdown
  // const modal = props.modal;
  // const toggle = props.toggle();
  //let categoryOptions = props.budgets;

  //* EDIT BUDGET
  const editBudget = async (e) => {
    e.preventDefault();

    const budgetAmt = budgetAmtRef.current.value;
    //const budgetCat = budgetCatRef.current.value;
    //const assignedUser = assignedUserRef.current.value;
    //const id = budgetID;

    // Edit fetch
    let url = `http://localhost:4000/budget/edit/${id}`;
    
    let newBudgetObj = JSON.stringify({
      amount: budgetAmt,
      // budgetAmt: budgetAmt,
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    const reqOption = {
      headers: headers,
      body: newBudgetObj,
      method: "PATCH",
    };

    try {
      const res = await fetch(url, reqOption);
      const data = await res.json();

      // If the server provides a success message
      if (data.message == "Successfully updated budget!") {
      // if (data.message == "Budget has been updated successfully") {
        props.getBudgets(props.view);
         props.toggle();
      } else {
        // Do nothing, maybe build an error component later to tell the user to re-configure their item
    console.error(res.message);
    // console.error("Error when editing budget");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //TODO
  // Edit Button will trigger this fn that opens/returns a modal:
  // That modal will list/table tag out all budget items (i would use a borderless table)
  // To pop the table map over props.budget, need to add in a edit and delete button
  // in the map create a <tr> w/<td> budget cat, amount, & edit and delete button
  // When you click edit(need an onclick that turn each <td> into an input, also change the edit button td to a new update button)
  // Click the update button, run the fetch and go back to dashboard
 
  return (
    <div>
      <Form onSubmit={UpdateBudgets}>
        <ModalBody>
          <FormGroup>
            <Label>
              Category 
              <i> (Currently: {`${budgetInfo.budgetCat}`})</i>
           </Label>
            {/*             <Input
              placeholder={budgetInfo.budgetCat}
              id="exampleSelect1"
              name="select"
              type="select"
              innerRef={budgetCatRef}
              required
            >
              {categoryOptions?.map((each) => {
                return (
                  <>
                    <option>{each.budgetCat}</option>
                  </>
                );
              })} */}
            {/*             </Input> */}
          </FormGroup>
          <FormGroup>
            <Label>
              Amount
              <i> (Currently: ${`${budgetInfo.budgetAmt}`})</i>
            </Label>
            <Input
              placeholder={budgetInfo.budgetAmt}
              innerRef={budgetAmtRef}
              autoComplete="off"
              type="Number"
              required
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <DeleteBudget
            token={props.token}
            getBudgets={props.getBudgets}
            //id={props.selected}
            budgetID={budgetID}
            budgets={props.budgets}
            toggle={props.toggle}
          />
          <Button color="primary" id="submit" onClick={editBudget}>
            Submit Changes
          </Button>{" "}
        </ModalFooter>
      </Form>
    </div>
  );
}

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
  console.log("the string budget", props.budget)
  console.log("A", props.budgetA)

  const budgetCatRef = useRef(); // dropdown
  const budgetAmtRef = useRef();
  const assignedUserRef = useRef(); // dropdown

  const modal = props.modal;
  // const toggle = props.toggle();

  let categoryOptions = props.budgets;

  //* EDIT BUDGET
  const editBudget = async (e) => {
    e.preventDefault();

    const budgetAmt = budgetAmtRef.current.value;
    const budgetCat = budgetCatRef.current.value;
    const assignedUser = assignedUserRef.current.value;
    const id = budgetID;

    // Edit fetch
    let url = `http://localhost:4000/budget/edit/${id}`;

    let newBudgetObj = JSON.stringify({
      budgetAmt: budgetAmt,
      budgetCat: budgetCat,
      assignedUser: assignedUser,
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
      if (data.message == "Budget has been updated successfully") {
        props.getBudgets(props.view);
        /*         toggle(); */
      } else {
        // Do nothing, maybe build an error component later to tell the user to re-configure their item
        console.error("Error when editing bill");
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
  const displayModal = () => {
    return <></>;
  };

  // return (
  //   <>

  //     <Button
  //         onClick={displayModal()}
  //         color="success"
  //         >Update Budget
  //         </Button>

  //   </>
  // )};

  return (
    <div>
      <Form onSubmit={UpdateBudgets}>
        <ModalBody>
          <FormGroup>
            <Label input>
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
            <Label input>
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
            id={budgetID}//! needs to be rewritten to props.(whatever we choose to call it in Selector 143)
          />
          <Button color="primary" id="submit">
            {editBudget}
            Submit Changes
          </Button>{" "}
        </ModalFooter>
      </Form>
    </div>
  );
}

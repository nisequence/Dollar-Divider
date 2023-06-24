import React, { useRef, useState } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

export default function NewInfo(props) {
  //* Use useRef to get values from each input
  const categoryRef = useRef();
  const amountRef = useRef();

  let baseBoolean;
  if (props.view === false) {
    baseBoolean = "personal";
  } else {
    baseBoolean = "household";
  }

  //* Create a function to handle the form inputs when the user attempts to create a new room
  const submitBudget = async (e) => {
    const category = categoryRef.current.value;
    const amount = amountRef.current.value;

    let url = "http://localhost:4000/budget/add";

    let budgetObj = JSON.stringify({
      category: category,
      amount: amount,
      base: baseBoolean,
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    const reqOption = {
      headers: headers,
      body: budgetObj,
      method: "POST",
    };

    try {
      const res = await fetch(url, reqOption);
      const data = await res.json();

      // If the server provides a success message
      if (
        data.message == "You are now the owner of a brand-new budget!" ||
        data.message == "Your household is now the owner of a brand-new budget!"
      ) {
      } else {
        // Do nothing, maybe build an error component later to tell the user to re-configure their item
        console.error("User is unauthorized.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Form onSubmit={submitBudget}>
        <FormGroup>
          <Input
            placeholder="New Budget Category"
            innerRef={categoryRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Dollar Amount"
            innerRef={amountRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        <Button color="success" type="submit">
          Create Budget
        </Button>
      </Form>
    </>
  );
}

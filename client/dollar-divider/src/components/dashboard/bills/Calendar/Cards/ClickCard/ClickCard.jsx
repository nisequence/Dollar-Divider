import React, { useRef, useState } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

export default function ClickCard(props) {
  const [autoPayVal, setAutoPayVal] = useState(false);
  //* Use useRef to get values from each input
  const categoryRef = useRef();
  const amountRef = useRef();

  //   let baseBoolean;
  //   if (baseVal) {
  //     baseBoolean = "personal";
  //   } else if (!baseVal) {
  //     baseBoolean = "household";
  //   }

  //* Create a function to handle the form inputs when the user attempts to edit the given bill
  const editBill = async (e) => {
    const category = categoryRef.current.value;
    const amount = amountRef.current.value;

    let url = `http://localhost:4000/bills/edit/${props.billInfo.id}`;

    let budgetObj = JSON.stringify({
      category: category,
      amount: amount,
    });

    console.log(budgetObj);

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
      <Form onSubmit={editBill}>
        <FormGroup>
          <Label input>Category</Label>
          <Input
            placeholder={props.billInfo.category}
            innerRef={categoryRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label input>Cost</Label>
          <Input
            placeholder={props.billInfo.amount}
            innerRef={amountRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        <Button color="success" id="submit">
          Create Bill
        </Button>
      </Form>
    </>
  );
}

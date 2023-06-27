import React, { useRef, useState } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

export default function NewInfo(props) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  let categoryOptions = props.budgets;
  //* Use useRef to get values from each input
  const titleRef = useRef();
  const amountRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const categoryRef = useRef();
  const autoPayRef = useRef();
  const recurringRef = useRef();

  let base;
  if (props.view === false) {
    base = "personal";
  } else {
    base = "household";
  }
  //* Create a function to handle the form inputs when the user attempts to create a new room
  const submitBill = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const amount = amountRef.current.value;
    const dueMonth = monthRef.current.value;
    const dueDay = dayRef.current.value;
    const category = categoryRef.current.value;
    let autoPay;
    if (autoPayRef.current.value === "on") {
      autoPay = true;
    } else {
      autoPay = false;
    }
    let recurring;
    if (recurringRef.current.value === "on") {
      recurring = true;
    } else {
      recurring = false;
    }

    let url = "http://localhost:4000/bills/add";

    let billObj = JSON.stringify({
      title: title,
      amount: amount,
      dueMonth: dueMonth,
      dueDay: dueDay,
      autoPay: autoPay,
      recurring: recurring,
      category: category,
      base: base,
    });

    console.log(billObj);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    const reqOption = {
      headers: headers,
      body: billObj,
      method: "POST",
    };

    try {
      const res = await fetch(url, reqOption);
      const data = await res.json();

      // If the server provides a success message
      if (
        data.message === "You have created a new bill!" ||
        data.message === "Your household has a new bill!"
      ) {
        props.getBills();
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
      <Form onSubmit={submitBill}>
        <FormGroup>
          <Label for="exampleSelectMulti">Choose Category</Label>
          <Input
            id="exampleSelect1"
            name="select"
            type="select"
            innerRef={categoryRef}
            required
          >
            {categoryOptions?.map((each) => {
              return (
                <>
                  <option>{each.budgetCat}</option>
                </>
              );
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectMulti">Choose Month Due</Label>
          <Input
            id="exampleSelect2"
            name="select"
            type="select"
            innerRef={monthRef}
            required
          >
            {months.map((each) => {
              return (
                <>
                  <option value={each}>{each}</option>
                </>
              );
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect3">Choose Day Due</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            innerRef={dayRef}
            required
          >
            {days.map((each) => {
              return (
                <>
                  <option value={each}>{each}</option>
                </>
              );
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Name of Bill"
            innerRef={titleRef}
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
        <Form>
          <FormGroup check inline>
            <Input type="checkbox" innerRef={autoPayRef} />
            <Label check>Auto-pay</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input type="checkbox" innerRef={recurringRef} />
            <Label check>Recurring</Label>
          </FormGroup>
        </Form>
        <FormGroup>{/* autoPay */}</FormGroup>
        <FormGroup>{/* recurring */}</FormGroup>
        <Button color="success" type="submit">
          Create Bill
        </Button>
      </Form>
    </>
  );
}

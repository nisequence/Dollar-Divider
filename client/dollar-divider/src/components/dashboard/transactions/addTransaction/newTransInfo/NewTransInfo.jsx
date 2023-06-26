import React from 'react';
import React, { useRef, useState } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

export default function NewTransInfo(props, { direction, args }) {
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
  //* Dropdown settings
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  //* Use useRef to get values from each input
  const dateRef = useRef();
  const descRef = useRef();
  const merchantRef = useRef();
  const amountRef = useRef();
  const checkNumRef = useRef();
  const manuelEntry= useRef();
  const finAccount= useRef();
  const category = useRef();
  const type = useRef();

  let base;
  if (props.view === false) {
    base = "personal";
  } else {
    base = "household";
  }
  //* Create a function to handle the form inputs when the user attempts to create a new room
  const submitTrans = async (e) => {
    e.preventDefault();
    // const category = categoryRef.current.value;
    const title = titleRef.current.value;
    const amount = amountRef.current.value;
    const dueMonth = monthRef.current.value;
    const dueDay = dayRef.current.value;
    const category = categoryRef.current.value;
    console.log(base);

    let url = "http://localhost:4000/bills/add";

    let billObj = JSON.stringify({
      title: title,
      amount: amount,
      dueMonth: dueMonth,
      dueDay: dueDay,
      autoPay: false, //! change later
      recurring: true, //! change later
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
        <FormGroup>{/* autoPay */}</FormGroup>
        <FormGroup>{/* recurring */}</FormGroup>
        <Button color="success" type="submit">
          Create Bill
        </Button>
      </Form>
    </>
  );
}

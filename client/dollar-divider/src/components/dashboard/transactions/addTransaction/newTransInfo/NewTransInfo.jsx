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
  const monthRef = useRef();
  const dayRef = useRef();
  const descRef = useRef();
  const merchantRef = useRef();
  const amountRef = useRef();
  const checkNumRef = useRef();
  const manualEntryRef= useRef();
  const finAccountRef= useRef();
  const categoryRef = useRef();
  const typeRef = useRef();
  const baseRef = useRef();

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
    const date = dateRef.current.value;
    const desc = descRef.current.value;
    const amount = amountRef.current.value;
    const month = monthRef.current.value;
    const day = dayRef.current.value;
    const category = categoryRef.current.value;
    const merchant = merchantRef.current.value;
    const checkNumber = checkNumRef.current.value;
    const manualEntry = manualEntryRef.current.value;
    const finAccount = finAccountRef.current.value;
    const type = typeRef.current.value;
    const base = baseRef.current.value;
    console.log(base);

    let url = "http://localhost:4000/transaction/add";

    let transObj = JSON.stringify({
      date: month + day,
      desc: desc,
      merchant: merchant,
      amount: amount,
      checkNumber: checkNumber,
      manualEntry: manualEntry,
      finAccount: finAccount,
      category: category,
      type: type,
      base: base,
    });

    console.log(transObj);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    const reqOption = {
      headers: headers,
      body: transObj,
      method: "POST",
    };

    try {
      const res = await fetch(url, reqOption);
      const data = await res.json();

      // If the server provides a success message
      if (
        data.message === "You have created a new transaction!" ||
        data.message === "Your household has a new transaction!"
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
      <Form onSubmit={submitTrans}>
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
          <Label for="exampleSelectMulti">Choose Month</Label>
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
          <Label for="exampleSelect3">Choose Day</Label>
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
            placeholder="Name of Transaction"
            innerRef={descRef}
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
        <FormGroup>
          <Input
            placeholder="Income or Expense"
            innerRef={typeRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="financial  Account"
            innerRef={finAccountRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>

        <FormGroup>{/* manualEntry */}</FormGroup>
        <FormGroup>{/* checkNum */}</FormGroup>
        <Button color="success" type="submit">
          Create Transaction
        </Button>
      </Form>
    </>
  );
}


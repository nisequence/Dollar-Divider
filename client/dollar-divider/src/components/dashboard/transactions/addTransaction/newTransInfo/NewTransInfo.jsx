import React, { useRef, useState } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

export default function NewTransInfo(props) {
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
  const monthRef = useRef();
  const dayRef = useRef();
  const descRef = useRef();
  const merchantRef = useRef();
  const amountRef = useRef();
  const checkNumRef = useRef();
  //const manualEntryRef= useRef();
  const finAccountRef = useRef();
  const categoryRef = useRef();
  const typeRef = useRef();

  let base;
  if (props.view === false) {
    base = "personal";
  } else {
    base = "household";
  }
  //* Create a function to handle the form inputs when the user attempts to create a new room
  const submitTrans = async (e) => {
    e.preventDefault();
    const desc = descRef.current.value;
    const amount = amountRef.current.value;
    const month = monthRef.current.value;
    const day = dayRef.current.value;
    const category = categoryRef.current.value;
    const merchant = merchantRef.current.value;
    const checkNumber = checkNumRef.current.value;
    //const manualEntry = manualEntryRef.current.value;
    // const finAccount = "fix this";
    const finAccount = finAccountRef.current.value;
    const type = typeRef.current.value;

    let url = "http://localhost:4000/transaction/add";

    let transObj = JSON.stringify({
      month: month,
      day: day,
      desc: desc,
      merchant: merchant,
      amount: amount,
      checkNumber: checkNumber,
      //manualEntry: true,
      finAccount: finAccount,
      category: category,
      type: type,
      base: base,
    });

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
        props.getTransaction();
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
        {/* Name of Item */}
        <FormGroup>
          <Input
            placeholder="Name of Item"
            innerRef={descRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        {/* Cost */}
        <FormGroup>
          <Input
            placeholder="Cost"
            innerRef={amountRef}
            autoComplete="off"
            type="number"
            required
          />
        </FormGroup>
        {/* Merchant */}
        <FormGroup>
          <Input
            placeholder="Merchant"
            innerRef={merchantRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        {/* Income or Expense */}
        <FormGroup>
          <Input
            placeholder="Income or Expense"
            innerRef={typeRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        {/* Category */}
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
        {/* Month */}
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
        {/* Day */}
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
        {/* Choose Account */}
        <FormGroup>
          <Label for="exampleSelectMulti">Choose Account</Label>
          <Input
            id="exampleSelect1"
            name="select"
            type="select"
            innerRef={finAccountRef}
            required
          >
            {props.accounts?.map((a) => {
              return (
                <>
                  <option> {a.name}</option>
                </>
              );
            })}
          </Input>
        </FormGroup>
        {/* Check Number */}
        <FormGroup>
          <Input
            placeholder="Check Number"
            innerRef={checkNumRef}
            autoComplete="off"
            type="number"
          />
        </FormGroup>
        <Button color="success" type="submit">
          Create Transaction
        </Button>
      </Form>
    </>
  );
}

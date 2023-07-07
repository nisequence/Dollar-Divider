import React, { useState, useRef, useEffect } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
// import DatePicker from "../datePicker/DayPicker";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

export default function EditTransactionInfo(props) {
  // let accountsList = [];
  const [state, setState] = useState(true);
  // console.log("accountslist",accountsList)
  const transactionsToDelete = [
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
  // console.log("id:",props.id)
  // const submitTrans = async (e) => {
  //   e.preventDefault();
  //   const desc = descRef.current.value;
  //   const amount = amountRef.current.value;
  //   const month = monthRef.current.value;
  //   const day = dayRef.current.value;
  //   const category = categoryRef.current.value;
  //   const merchant = merchantRef.current.value;
  //   const checkNumber = checkNumRef.current.value;
  //   //const manualEntry = manualEntryRef.current.value;
  //   const finAccount = finAccountRef.current.value;
  //   const type = typeRef.current.value;

  //   let url = `http://localhost:4000/transaction/edit/${id}`;

  //   let transObj = JSON.stringify({
  //     month: month,
  //     day: day,
  //     desc: desc,
  //     merchant: merchant,
  //     amount: amount,
  //     checkNumber: checkNumber,
  //     //manualEntry: true,
  //     finAccount: finAccount,
  //     category: category,
  //     type: type,
  //     base: base,
  //   });

  //   let headers = new Headers();
  //   headers.append("Content-Type", "application/json");
  //   headers.append("Authorization", props.token);

  //   const reqOption = {
  //     headers: headers,
  //     body: transObj,
  //     method: "POST",
  //   };

  //   try {
  //     const res = await fetch(url, reqOption);
  //     const data = await res.json();

  //     // If the server provides a success message
  //     if (
  //       data.message === "You have created a new transaction!" ||
  //       data.message === "Your household has a new transaction!"
  //     ) {
  //       props.getTransaction();
  //     } else {
  //       // Do nothing, maybe build an error component later to tell the user to re-configure their item
  //       console.error("User is unauthorized.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  function incomeExpenseToggle() {
  // console.log(state);
  setState(!state);
  console.log(state);
}
  return (
    <>
      <Form onSubmit={() => console.log("form submitted")}>
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
        {/* Merchant Name */}
        <FormGroup>
          <Input
            placeholder="Merchant"
            innerRef={merchantRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        {/* Income vs Expense */}
        {/* <FormGroup>
          <Input
            placeholder="Income or Expense"
            innerRef={typeRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup> */}
        <FormGroup switch>
        <Input 
        type="switch" 
        role="switch" 
        checked={!state} 
        onClick={() => {incomeExpenseToggle()}}
        />
        <Label check>Income</Label>

      </FormGroup>
        {/* Choose Category */}
        <FormGroup>
          <Label for="exampleSelectMulti">Choose Category</Label>
          <Input
            id="exampleSelect1"
            name="select"
            type="select"
            innerRef={categoryRef}
            required
          >
            {props.categoryOptions?.map((each) => {
              return (
                <>
                  <option>{each.budgetCat}</option>
                </>
              );
            })}
          </Input>
        </FormGroup>
            {/* Choose Date */}
            <FormGroup>
              <DayPicker />
        </FormGroup>
        {/* Choose Month */}
        {/* <FormGroup>
          <Label for="exampleSelectMulti">Choose Month</Label>
          <Input
            id="exampleSelect2"
            name="select"
            type="select"
            innerRef={monthRef}
            required
          >
            {transactionsToDelete?.map((each) => {
              return (
                <>
                  <option value={each}>{each}</option>
                </>
              );
            })}
          </Input>
        </FormGroup> */}
        {/* Choose Day */}
        {/* <FormGroup>
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
        </FormGroup> */}
        {/* Choose Account */}
        <FormGroup>
          <Label for="exampleSelectMulti">Choose Account</Label>
          <Input
            id="exampleSelect1"
            name="select"
            type="select"
            innerRef={categoryRef}
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
        {/* Check # */}
        <FormGroup>
          <Input
            placeholder="Check Number (optional)"
            innerRef={checkNumRef}
            autoComplete="off"
            type="number"
          />
        </FormGroup>
      </Form>
    </>
  );
}

import React, { useRef, useState } from "react";
import { Form, FormGroup, Input, Button, Label, Col, Container, Row} from "reactstrap";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
// import DatePicker from "../../datePicker/DayPicker";
import "react-day-picker/dist/style.css";
let transactionType;

export default function NewTransInfo(props) {

  const [selected, setSelected] = React.useState();
  const [state, setState] = useState(true);
  if (state === true) {
    transactionType = "expense"
  } else {transactionType = "income"}
  console.log("transactionType",transactionType)
  // ! Inspired By Kate
  let month;
  if (selected) {
    month = selected.toString().slice(4, 7);
    if (month === "Jan") {
      month = "January";
    }
    if (month === "Feb") {
      month = "February";
    }
    if (month === "Mar") {
      month = "March";
    }
    if (month === "Apr") {
      month = "April";
    }
    if (month === "Jun") {
      month = "June";
    }
    if (month === "Jul") {
      month = "July";
    }
    if (month === "Aug") {
      month = "August";
    }
    if (month === "Sep") {
      month = "September";
    }
    if (month === "Oct") {
      month = "October";
    }
    if (month === "Nov") {
      month = "November";
    }
    if (month === "Dec") {
      month = "December";
    }
    sessionStorage.setItem("month:", month);
  }

  let day;
  if (selected) {
    day = parseInt(selected.toString().slice(8, 10));
    // sessionStorage.setItem("day:", day);
  }

  // ! End Inspired By Kate
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
  // const typeRef = useRef();

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
    // let month = "February";
    // const month = monthRef.current.value; //Todo Change this to the Date Picker
    // let day = 2;
    // const day = dayRef.current.value; //Todo Change This to the Date Picker
    const category = categoryRef.current.value;
    const merchant = merchantRef.current.value;
    // const checkNumber = checkNumRef.current.value;
    //const manualEntry = manualEntryRef.current.value;
    // const finAccount = "fix this";
    const finAccount = finAccountRef.current.value;
    // const type = typeRef.current.value;
    // const type = transactionType; 

    let url = "http://localhost:4000/transaction/add";

    let transObj = JSON.stringify({
      month: month,
      // month: JSON.stringify(sessionStorage.getItem("month")),
      // day: day,
      day: day = Number(day),
      // month: "July",
      desc: desc,
      merchant: merchant,
      amount: amount,
      // checkNumber: checkNumber,
      //manualEntry: true,
      finAccount: finAccount,
      // category: "category",
      category: category,
      // type: "expense",
      type: transactionType,
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
    <div>
      <Form id="addtransactionform" onSubmit={submitTrans}>
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
        <div id="addTransSwitch">
        <Label check>Expense</Label>
        <FormGroup switch>
          <Label check>Income</Label>
          <Input
            type = "switch"
            role="switch"
            check={state}
            onClick={() => {
              setState(!state);
            }}
          />
        </FormGroup>
        </div>
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
        {/* Day Picker */}
        <FormGroup>
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
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
        <Button color="success" type="submit">
          Create Transaction
        </Button>
      </Form>
    </div>
  );
}

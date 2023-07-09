import React, { useRef, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Col,
  Container,
  Row,
} from "reactstrap";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
// import DatePicker from "../../datePicker/DayPicker";
import "react-day-picker/dist/style.css";
let transactionType;

export default function NewTransInfo(props) {
  const [selected, setSelected] = React.useState();
  const [state, setState] = useState(true);
  if (state === true) {
    transactionType = "expense";
  } else {
    transactionType = "income";
  }
  console.log("transactionType", transactionType);
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
    // console.log("daytypeof", day, typeof day)
  }

  // ! End Inspired By Kate

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
  let id;
  let balance = 0;
  let transObj;
  let url;
  const submitTrans = async (e) => {
    let tempBalance;
    // e.preventDefault(); 
    props.getAccounts();
    console.log("props",props)
    // console.log(finAccountRef.current.value)
    props.accounts.map((a) => {
      if (a.name === finAccountRef.current.value) {
        id = a._id
        balance = a.balance;
      }
    })
    if (transactionType === "expense") {
      tempBalance = balance - Number(amountRef.current.value);
    } else {tempBalance = balance + Number(amountRef.current.value);}
    
    if (tempBalance < 0) {
      alert(`This will overdraw ${finAccountRef.current.value}`)
      url = `http://localhost:4000/finAccount/edit/${id}`;
    transObj = JSON.stringify({
      balance: tempBalance,
    })
    } else {
      url = `http://localhost:4000/finAccount/edit/${id}`;
      transObj = JSON.stringify({
        balance: tempBalance,
      })
    }
    
    

      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", props.token);
  
      const reqOption = {
        headers: headers,
        body: transObj,
        method: "PATCH",
      };
  
      try {
        const res = await fetch(url, reqOption);
        const data = await res.json();
        // If the server provides a success message
        if (
          data.message === `${finAccountRef.current.value} account has been updated successfully`
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


const submitNewTransaction = async (e) => {
  e.preventDefault();
  props.getTransaction()
  let url = "http://localhost:4000/transaction/add";

  let acctObj = JSON.stringify({

    month: month,
    day: (day = Number(day)),
    merchant: merchantRef.current.value,
    amount: amountRef.current.value,
    finAccount: finAccountRef.current.value,
    category: categoryRef.current.value,
    type: transactionType,
    base: base,
  });

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", props.token);

  const reqOption = {
    headers: headers,
    body: acctObj,
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
      submitTrans()
      props.getTransaction();
      props.toggleModal();
      props.getAccounts();
      props.getBudgets();
    } else {
      // Do nothing, maybe build an error component later to tell the user to re-configure their item
      console.error("User is unauthorized.");
    }
  } catch (err) {
    console.error(err);
  }
  }

  return (
    <Container>
      <Form id="addtransactionform" onSubmit={submitNewTransaction}>
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
        <Row id="TransactionMoneyRow">
          <Col>
            {/* Cost */}
            <FormGroup>
              <Input
                placeholder="Dollar Amount"
                innerRef={amountRef}
                autoComplete="off"
                type="number"
                required
              />
            </FormGroup>
          </Col>
          <Col>
            {/* Income or Expense */}
            <div id="addTransSwitch">
              <Label check>Expense</Label>
              <FormGroup switch>
                <Label check>Income</Label>
                <Input
                  type="switch"
                  role="switch"
                  check={state}
                  onClick={() => {
                    setState(!state);
                  }}
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        {/* Choose Account */}
        <FormGroup>
          {/* <Label for="exampleSelectMulti">Choose Account</Label> */}
          <Input
            id="exampleSelect1"
            name="select"
            type="select"
            innerRef={finAccountRef}
            required
          >
            <option value="" disabled selected>
              Select an account
            </option>
            {props.accounts?.map((a) => {
              return (
                <>
                  <option> {a.name}</option>
                </>
              );
            })}
          </Input>
        </FormGroup>
        {/* Category */}
        <FormGroup>
          {/* <Label for="exampleSelectMulti">Choose Category</Label> */}
          <Input
            id="exampleSelect1"
            name="select"
            type="select"
            innerRef={categoryRef}
            required
          >
            <option value="" disabled selected>
              Select a budget
            </option>
            {props.budgets?.map((each) => {
              return (
                <>
                  <option>{each.budgetCat}</option>
                </>
              );
            })}
          </Input>
        </FormGroup>
        <Row>
          {/* Day Picker */}
          <FormGroup>
            <DayPicker
              id="TransactionDayPicker"
              mode="single"
              selected={selected}
              onSelect={setSelected}
            />
          </FormGroup>
        </Row>
        <Button color="success" type="submit">
          Create Transaction
        </Button>
      </Form>
    </Container>
  );
}

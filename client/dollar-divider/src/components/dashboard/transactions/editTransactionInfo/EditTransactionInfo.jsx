import React, { useState, useRef } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

export default function EditTransactionInfo(props) {
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

  // return (
  //   <>
  //   {deleteTransaction}
  //   </>
  //   // <h1>ID:{id}</h1>
  // )

  // };

  return (
    <>
      <Form onSubmit={() => console.log("form submitted")}>
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
            {transactionsToDelete?.map((each) => {
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
            type="number"
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
            placeholder="Financial  Account"
            innerRef={finAccountRef}
            autoComplete="off"
            type="text"
            required="false"
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Merchant"
            innerRef={merchantRef}
            autoComplete="off"
            type="text"
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Check Number"
            innerRef={checkNumRef}
            autoComplete="off"
            type="number"
          />
        </FormGroup>
      </Form>
    </>
  );
}

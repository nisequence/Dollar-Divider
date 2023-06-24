import React, { useRef, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";

export default function NewInfo(props, { direction, args }) {
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  let categoryOptions = props.budgets;
  //* Dropdown settings
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  //* Use useRef to get values from each input
  const categoryRef = useRef();
  const amountRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();

  //* Create a function to handle the form inputs when the user attempts to create a new room
  const submitBudget = async (e) => {
    // const category = categoryRef.current.value;
    const amount = amountRef.current.value;

    let url = "http://localhost:4000/budget/add";

    let billObj = JSON.stringify({
      //   title: title,
      //   amount: amount,
      //   dueMonth: dueMonth,
      //   dueDay: dueDay,
      //   autoPay: autoPay,
      //   recurring: recurring,
      //   category: category,
      //   base: base,
    });

    // console.log(billObj);

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
        //! need to replace this with bill controller messages
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
          <Label for="exampleSelectMulti">Choose Category</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            innerRef={categoryRef}
          >
            {categoryOptions.map((each) => {
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
            id="exampleSelect"
            name="select"
            type="select"
            innerRef={monthRef}
          >
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectMulti">Choose Day Due</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            innerRef={dayRef}
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
            Label="Month Due"
            placeholder="What month will this be due?"
            innerRef={monthRef}
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
        <Button color="success">Create Budget</Button>
      </Form>
    </>
  );
}

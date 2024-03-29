import React, { useState, useRef, useEffect } from "react";
import {
  Col,
  Row,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Tooltip,
} from "reactstrap";
import { BsFillEnvelopePaperFill } from "react-icons/bs";
import { MdSave } from "react-icons/md";
import DeleteBill from "./DeleteBill";
import MarkPaid from "./MarkPaid";

export default function OpenCard(props) {
  // props.getBudgets();
  let billInfo = props.billInfo;
  let billID = billInfo._id;

  const categoryRef = useRef(); // dropdown
  const amountRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const autoPayRef = useRef();
  const recurringRef = useRef();
  const assignedUserRef = useRef(); // dropdown

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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

  //* Create a function to handle the form inputs when the user attempts to edit the given bill
  const editBill = async (e) => {
    e.preventDefault();

    const amount = amountRef.current.value;
    const dueMonth = monthRef.current.value;
    const dueDay = dayRef.current.value;
    const category = categoryRef.current.value;
    const id = billID;

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

    let url = `http://localhost:4000/bills/edit/${id}`;

    let newBillObj = JSON.stringify({
      amount: amount,
      dueMonth: dueMonth,
      dueDay: dueDay,
      autoPay: autoPay,
      recurring: recurring,
      category: category,
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    const reqOption = {
      headers: headers,
      body: newBillObj,
      method: "PATCH",
    };

    try {
      const res = await fetch(url, reqOption);
      const data = await res.json();

      // If the server provides a success message
      if (data.message == "Bill has been updated successfully") {
        props.getBills(props.view);
        toggle();
      } else {
        // Do nothing, maybe build an error component later to tell the user to re-configure their item
        console.error("Error when editing bill");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button className="opencardBtn" onClick={toggle}>
      {/* <Button id="opencardBtn" color="info" onClick={toggle}> */}
        <BsFillEnvelopePaperFill />
      </Button>
      <Modal isOpen={modal} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>Viewing {billInfo.title} Bill</ModalHeader>
        <Form onSubmit={editBill}>
          <ModalBody>
            <FormGroup>
              <Label input>
                Category
                <i> (Currently: {billInfo.category})</i>
              </Label>
              <Input
                placeholder={props.billInfo.category}
                id="exampleSelect1"
                name="select"
                type="select"
                innerRef={categoryRef}
                required
              >
                <option value="" disabled selected>
                  Select a budget
                </option>
                {categoryOptions?.map((each) => {
                  return (
                    <option key={categoryOptions.indexOf(each)}>
                      {each.budgetCat}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label input>
                Cost
                <i> (Currently: ${billInfo.amount})</i>
              </Label>
              <Input
                placeholder={billInfo.amount}
                innerRef={amountRef}
                autoComplete="off"
                type="Number"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelectMulti">
                Choose Month Due<i> (Currently: {billInfo.dueMonth})</i>
              </Label>
              <Input
                id="exampleSelect2"
                name="select"
                type="select"
                innerRef={monthRef}
                required
              >
                <option value="" disabled selected>
                  Select a month
                </option>
                {months.map((each) => {
                  return (
                    <option key={months.indexOf(each)} value={each}>
                      {each}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect3">
                Choose Day Due<i> (Currently: Day {billInfo.dueDay})</i>
              </Label>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                innerRef={dayRef}
                required
              >
                <option value="" disabled selected>
                  Select a day
                </option>
                {days.map((each) => {
                  return (
                    <option key={days.indexOf(each)} value={each}>
                      {each}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <Label>
              {`Currently set to autopay: `}
              <strong>{`${billInfo.autoPay} `}</strong>
              {`and recurring: `} <strong>{`${billInfo.recurring}`}</strong>
            </Label>
            <br></br>
            <FormGroup check inline>
              <Input type="checkbox" innerRef={autoPayRef} />
              <Label check>Auto-pay</Label>
            </FormGroup>
            <FormGroup check inline>
              <Input type="checkbox" innerRef={recurringRef} />
              <Label check>Recurring</Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <DeleteBill
              token={props.token}
              getBills={props.getBills}
              id={billID}
              toggle={toggle}
            />
            {/* {payable()} */}
            <MarkPaid
              token={props.token}
              getBills={props.getBills}
              id={billID}
              value={billInfo.paid}
              toggle={toggle}
              view={props.view}
            />
            <Button color="primary" id="submit">
              <MdSave /> Save
            </Button>{" "}
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}

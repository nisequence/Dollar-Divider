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
} from "reactstrap";
import DeleteBill from "./DeleteBill";
import MarkPaid from "./MarkPaid";

export default function OpenCard(props) {
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

  //* IF paid switch button to Mark Unpaid color="warning"
  //! The below needs work
  //   let payable = () => {
  //     const markPaid = async (id, boolean) => {
  //       console.log("Paid:", id, boolean);
  //     };
  //     if (billInfo.paid === true) {
  //       return (
  //         <Button color="warning" onClick={markPaid(billInfo.id, false)}>
  //           Mark Unpaid
  //         </Button>
  //       );
  //     } else {
  //       return (
  //         <Button color="success" onClick={markPaid(billInfo.id, true)}>
  //           Mark Paid
  //         </Button>
  //       );
  //     }
  //   };

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Open
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
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
                {days.map((each) => {
                  return (
                    <>
                      <option value={each}>{each}</option>
                    </>
                  );
                })}
              </Input>
            </FormGroup>
            <Label>
              {`Currently set to Autopay: ${billInfo.autoPay} and Recurring: 
              ${billInfo.recurring}`}
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
              Submit Changes
            </Button>{" "}
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

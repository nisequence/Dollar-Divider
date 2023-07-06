import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  PopoverHeader,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";
import { v4 } from "uuid";
import NewTransInfo from "./newTransInfo/NewTransInfo";
// import DatePicker from "../datePicker/DayPicker";
export default function AddTransaction(props) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  let url;
  const [budgets, setBudgets] = useState([]);
  const getBudgets = async (viewValue) => {

    if (viewValue == true) {
      url = "http://localhost:4000/budget/household";
    } else {
      url = "http://localhost:4000/budget/mine";
    }
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // If the server does not provide a failure message
      if (data.message == "Budget(s) found!") {
        setBudgets(data.allBudgets);
      } else {
        setBudgets(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      getBudgets(props.view);
    }
  }, [props.token, props.view]);
  let transactionType;
  // console.log("props.view",props)
      if (props.view === true) {
    transactionType = "Household"
  } else {transactionType = "Personal"}

  return (
    <div id="testing" key={v4}>
      
      <Button
      onClick={() => {
        toggleModal();
      }}
        // id="UncontrolledPopoverAddTransaction"
        id="UncontrolledModalEditTransaction"
        color="success"
        // type="button"
        style={{
          maxWidth: "4vw",
          display: "inline-block",
        }}
      >
        +
      </Button>
      {/* <UncontrolledPopover */}
      <Modal 
      isOpen={modal}
      fade={false}
      toggle={toggleModal}
        // placement="top"
        // target="UncontrolledPopoverAddTransaction"
        trigger="legacy"
      >
        <ModalHeader toggle = {toggleModal}>New {transactionType} Transaction</ModalHeader>
        {/* <PopoverHeader>Add New Transaction</PopoverHeader> */}
        {/* <PopoverBody> */}
        <ModalBody key={v4}>
          <NewTransInfo
            token={props.token}
            view={props.view}
            month={props.month}
            budgets={budgets}
            getTransaction={props.getTransaction}
            category = {props.category}
            accounts = {props.accounts}
          />
          </ModalBody>
        {/* </PopoverBody> */}
      {/* </UncontrolledPopover> */}
      </Modal>
    </div>
  );
}

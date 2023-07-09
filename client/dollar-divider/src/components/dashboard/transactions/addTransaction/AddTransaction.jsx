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

  useEffect(() => {
    if (props.token) {
      props.getBudgets(props.view);
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
        <ModalBody key={v4}>
          <NewTransInfo
            token={props.token}
            view={props.view}
            month={props.month}
            budgets={props.budgets}
            getTransaction={props.getTransaction}
            accounts = {props.accounts}
            transaction = {props.transaction}
          />
          </ModalBody>
      </Modal>
    </div>
  );
}

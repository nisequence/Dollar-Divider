import React, { useState, useEffect } from "react";
import {
  Button,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { BsFillEnvelopePlusFill } from "react-icons/bs";
import NewInfo from "./NewInfo/NewInfo";

export default function AddBill(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  let url;
  const [budgets, setBudgets] = useState([]);
  
  const getBudgets = async () => {
    let viewValue = props.view;
    if (viewValue === true) {
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
      if (data.message === "Budget(s) found!") {
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
      getBudgets();
    }
  }, [props.token, props.view]);

  return (
    <>
      <Button
        id="ModalAddBill"
        color="success"
        type="button"
        onClick={toggleModal}
      >
        <BsFillEnvelopePlusFill id="AddBill" /> Create Bill
        <Tooltip isOpen={tooltipOpen} target="ModalAddBill" toggle={toggle}>
          Add a new bill here!
        </Tooltip>
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Bill</ModalHeader>
        <ModalBody>
          <NewInfo
            getBills={props.getBills}
            token={props.token}
            view={props.view}
            month={props.month}
            budgets={budgets}
            getBudgets={getBudgets}
            toggle={toggleModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

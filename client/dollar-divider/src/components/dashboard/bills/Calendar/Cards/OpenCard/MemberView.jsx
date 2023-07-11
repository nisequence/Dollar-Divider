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
  Label,
} from "reactstrap";
import { BsFillEnvelopePaperFill } from "react-icons/bs";
import MarkPaid from "./MarkPaid";

export default function MemberView(props) {
  let billInfo = props.billInfo;
  let billID = billInfo._id;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  console.log("memberviewprops", props)
  return (
    <>
      <Button className="btn" onClick={toggle}>
        <BsFillEnvelopePaperFill />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Viewing {billInfo.title} Bill</ModalHeader>
        <ModalBody>
          <h6>
            <Label input>
              <b>Category:</b> {billInfo.category}
            </Label>
          </h6>
          <h6>
            <Label input>
              <b>Cost:</b> ${billInfo.amount}
            </Label>
          </h6>
          <h6>
            <Label for="exampleSelectMulti">
              <b>Due:</b> {billInfo.dueMonth} {billInfo.dueDay}
            </Label>
          </h6>
          <h6>
            <Label>
              <b>Autopay:</b> {`${billInfo.autoPay}`}
            </Label>
          </h6>
          <h6>
            <Label>
              <b>Recurring:</b> {`${billInfo.recurring}`}
            </Label>
          </h6>
        </ModalBody>
        <ModalFooter>
          <MarkPaid
            token={props.token}
            getBills={props.getBills}
            id={billID}
            value={billInfo.paid}
            toggle={toggle}
            view={props.view}
            getBudgets={props.getBudgets}
            getTransaction={props.getTransaction}
            getAccounts = {props.getAccounts}
          />
        </ModalFooter>
      </Modal>
    </>
  );
}

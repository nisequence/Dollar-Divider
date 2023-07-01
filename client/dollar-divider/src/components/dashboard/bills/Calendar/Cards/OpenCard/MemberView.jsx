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
import MarkPaid from "./MarkPaid";

export default function MemberView(props) {
  let billInfo = props.billInfo;
  let billID = billInfo._id;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button color="info" onClick={toggle}>
        Open
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
          />
        </ModalFooter>
      </Modal>
    </>
  );
}
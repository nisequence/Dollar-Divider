import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default function Join(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <h6>Have a token? </h6>
      <Button color="primary" onClick={toggle}>
        Join Existing Household
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Join Existing Household</ModalHeader>
        <ModalBody>
          Received a token from a friend or family member? Enter it below!
          <br></br>
          <br></br>
          <Input required placeholder="Enter Token Here"></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
          <Button color="success" onClick={toggle}>
            Join Household
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  );
}

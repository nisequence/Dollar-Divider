import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default function New() {
  const [modalNew, setModalNew] = useState(false);

  const toggleNew = () => setModalNew(!modalNew);
  return (
    <>
      <h6>Otherwise ...</h6>
      <Button color="success" onClick={toggleNew}>
        Create a New Household
      </Button>
      <Modal isOpen={modalNew} toggleNew={toggleNew}>
        <ModalHeader toggleNew={toggleNew}>Create New Household</ModalHeader>
        <ModalBody>
          Ready to start your own household?
          <br></br>
          <br></br>
          <Input required placeholder="Name Your Household"></Input>
          <br></br>
          <Input required placeholder="Member Limit" type="number"></Input>
          {/* Not 0!!!! */}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleNew}>
            Cancel
          </Button>
          <Button color="success" onClick={toggleNew}>
            Create Household
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  );
}

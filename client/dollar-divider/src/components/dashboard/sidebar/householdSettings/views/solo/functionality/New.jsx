import React, { useState, useRef } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { BsHouseAdd } from "react-icons/bs";

export default function New(props) {
  const nameRef = useRef();
  const numberRef = useRef();

  async function createHousehold() {
    const newName = nameRef.current.value;
    const num = numberRef.current.value;

    let bodyObj = JSON.stringify({
      householdName: newName,
      maxNum: num,
    });
    const url = `http://localhost:4000/household/new`;

    let requestOptions = {
      headers: new Headers({
        Authorization: props.token,
        "Content-Type": "application/json",
      }),
      method: "POST",
      body: bodyObj,
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();

      if (data.message === "You are now the admin of a household!") {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const [modalNew, setModalNew] = useState(false);

  const toggleNew = () => setModalNew(!modalNew);
  return (
    <>
      <h6>Otherwise ...</h6>
      <Button color="success" onClick={toggleNew}>
        <BsHouseAdd /> Create New
      </Button>
      <Modal isOpen={modalNew} toggleNew={toggleNew}>
        <ModalHeader toggleNew={toggleNew}>Create New Household</ModalHeader>
        <ModalBody>
          Ready to start your own household?
          <br></br>
          <br></br>
          <Input
            required
            placeholder="Name Your Household"
            innerRef={nameRef}
          ></Input>
          <br></br>
          <Input
            required
            placeholder="Member Limit"
            type="number"
            innerRef={numberRef}
          ></Input>
          {/* Not 0!!!! */}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleNew}>
            Cancel
          </Button>
          <Button color="success" onClick={createHousehold}>
            <BsHouseAdd /> Create
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  );
}

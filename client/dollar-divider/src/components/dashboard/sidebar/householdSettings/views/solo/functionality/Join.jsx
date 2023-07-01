import React, { useState, useRef } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FaHouseUser } from "react-icons/fa";

export default function Join(props) {
  const idRef = useRef();
  async function joinHousehold(e) {
    e.preventDefault();

    const id = idRef.current.value;
    const url = `http://localhost:4000/household/join/${id}`;

    let requestOptions = {
      headers: new Headers({
        Authorization: props.token,
        "Content-Type": "application/json",
      }),
      method: "PATCH",
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();

      if (data.message === `Welcome to the household!`) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <h6>Have a token? </h6>
      <Button color="primary" onClick={toggle}>
        <FaHouseUser /> Join Existing
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Join Existing Household</ModalHeader>
        <ModalBody>
          Received a token from a friend or family member? Enter it below!
          <br></br>
          <br></br>
          <Input
            required
            placeholder="Enter Token Here"
            innerRef={idRef}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={joinHousehold}>
            <FaHouseUser /> Join Household
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  );
}

import React, { useState, useRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { TbHomeEdit } from "react-icons/tb";
import { MdSave } from "react-icons/md";

export default function Edit(props) {
  const nameRef = useRef();
  const numberRef = useRef();

  async function editHousehold() {
    const newName = nameRef.current.value;
    const num = numberRef.current.value;

    let bodyObj = JSON.stringify({
      householdName: newName,
      maxNum: num,
      banUser: null,
    });
    const url = `http://localhost:4000/household/edit`;

    let requestOptions = {
      headers: new Headers({
        Authorization: props.token,
        "Content-Type": "application/json",
      }),
      method: "PATCH",
      body: bodyObj,
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();

      if (data) {
        props.getHousehold();
        toggle();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="warning" onClick={toggle}>
        {/*         <GrEdit /> Edit Info
         */}{" "}
        <TbHomeEdit /> Edit Info
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Household Info</ModalHeader>
        <ModalBody>
          New Title
          <Input
            required
            placeholder={props.householdInfo.name}
            innerRef={nameRef}
          ></Input>
          <br></br>
          New Limit of Members
          <Input
            required
            type="number"
            style={{ maxWidth: "8vw" }}
            innerRef={numberRef}
            placeholder={props.householdInfo.participantMaxNum}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editHousehold}>
            <MdSave /> Save Changes
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}

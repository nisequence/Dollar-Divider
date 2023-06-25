import React from "react";
import { Button } from "reactstrap";

export default function Ban(props) {
  async function banUser(e) {
    e.preventDefault();

    let bodyObj = JSON.stringify({
      banUser: props.userID,
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
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Button color="danger" onClick={banUser}>
      Ban
    </Button>
  );
}

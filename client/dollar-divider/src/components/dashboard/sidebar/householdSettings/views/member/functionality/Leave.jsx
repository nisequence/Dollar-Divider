import React from "react";
import { Button } from "reactstrap";
import { BsHouseXFill } from "react-icons/bs";

export default function Leave(props) {
  async function quitHousehold(e) {
    e.preventDefault();
    const url = `http://localhost:4000/user/abandon`;

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

      if (
        data.message === "User was successfully removed from the household!"
      ) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Button color="danger" onClick={quitHousehold}>
        <BsHouseXFill /> Leave
      </Button>
    </>
  );
}

import React from "react";
import { Button } from "reactstrap";
import { MdDeleteForever } from "react-icons/md";

export default function Delete(props) {
  async function deleteHousehold() {
    const url = `http://localhost:4000/household/admin/remove`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();

      //* If we get the right response from the server
      if (data.message === "Household deleted.") {
        // refresh the whole page due to modified access/abilities
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <Button color="danger" onClick={deleteHousehold}>
        <MdDeleteForever /> Delete Household
      </Button>
    </>
  );
}

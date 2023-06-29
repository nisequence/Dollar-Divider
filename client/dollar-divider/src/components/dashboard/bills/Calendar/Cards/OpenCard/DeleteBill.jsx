import React from "react";
import { Button } from "reactstrap";

export default function DeleteBill(props) {
  console.log(props);
  async function deleteBill() {
    const url = `http://localhost:4000/bills/delete/${props.id}`;

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
      if (data.message === "Bill was successfully deleted!") {
        props.getBills();
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <Button color="danger" onClick={deleteBill}>
        Delete Bill
      </Button>
    </>
  );
}

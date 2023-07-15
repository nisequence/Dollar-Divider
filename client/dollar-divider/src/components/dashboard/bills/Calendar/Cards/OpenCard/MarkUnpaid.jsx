import React from "react";
import { Button } from "reactstrap";
import { BsFillEnvelopeExclamationFill } from "react-icons/bs";

export default function MarkUnpaid(props) {
  async function unpayBill() {
    let value;
    if (props.value == true) {
      value = false;
    } else {
      value = true;
    }

    const url = `http://localhost:4000/bills/delete/${props.id}`;
    // const url = `http://localhost:4000/bills/pay/${props.id}`;

    let paidBill = JSON.stringify({
      paid: value,
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    let requestOptions = {
      headers: headers,
      body: paidBill,
      method: "DELETE",
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      //* If we get the right response from the server
      if (data.message === "Bill was successfully deleted!") {
        props.getBills();
        props.toggle();
        unsubmitTransaction();
      }
    } catch (err) {
      console.error(err);
    }

    console.log("unpaybillclicked");
    // unsubmitTransaction()
  }

  async function unsubmitTransaction() {
    let url = `http://localhost:4000/transaction/delete/${props.billInfo._id}`;
    console.log("props.billInfo._id", props.billInfo._id);
    alert(`deleteURL: ${url}`);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      if (data.message === "Transaction was successfully deleted!") {
        props.getTransaction();
        // alert("deleted")
      }
    } catch (error) {
      console.error(error);
    }
    props.getTransaction();
  }

  console.log("billInfo", props.billInfo);
  return (
    <>
      <Button color="warning" onClick={unpayBill}>
        <BsFillEnvelopeExclamationFill /> Mark Unpaid
      </Button>
    </>
  );
}

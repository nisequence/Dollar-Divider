import React from "react";
import { Button } from "reactstrap";
import {
  BsFillEnvelopeCheckFill,
  BsFillEnvelopeExclamationFill,
} from "react-icons/bs";

export default function MarkPaid(props) {
  async function payBill() {
    let value;
    if (props.value == true) {
      value = false;
    } else {
      value = true;
    }

    const url = `http://localhost:4000/bills/pay/${props.id}`;

    let paidBill = JSON.stringify({
      paid: value,
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    let requestOptions = {
      headers: headers,
      body: paidBill,
      method: "PATCH",
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      //* If we get the right response from the server
      if (data.message === "Bill has been updated successfully") {
        props.getBills(props.view);
        props.toggle();
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (props.value === true) {
    return (
      <Button color="warning" onClick={payBill}>
        <BsFillEnvelopeExclamationFill /> Mark Unpaid
      </Button>
    );
  } else {
    return (
      <Button color="success" onClick={payBill}>
        <BsFillEnvelopeCheckFill /> Mark Paid
      </Button>
    );
  }

  return <></>;
}

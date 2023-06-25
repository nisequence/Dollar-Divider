import React from "react";
import { Button } from "reactstrap";

export default function Tweak(props) {
  async function tweakPercents(e) {
    e.preventDefault();

    let bodyObj = JSON.stringify({
      newBreakdown: props.percentageArray,
    });
    const url = `http://localhost:4000/household/tweak`;

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
    <>
      <Button
        onClick={props.grabPercents}
        color="success"
        //   onClick={tweakPercents}
      >
        Submit
      </Button>
    </>
  );
}

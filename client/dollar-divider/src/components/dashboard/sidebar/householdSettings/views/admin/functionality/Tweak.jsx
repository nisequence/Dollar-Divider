import React from "react";
import { Button } from "reactstrap";

export default function Tweak(props) {
  async function tweakPercents(array) {
    let bodyObj = JSON.stringify({
      newBreakdown: array,
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
        props.edit(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  let grabPercents = () => {
    let limit = props.info.participantNames.length;
    let percentArray = [];
    for (let x = 0; x < limit; x++) {
      let inputValue =
        document.getElementsByClassName("percentageInput")[x].value;
      percentArray.push(inputValue);
    }
    console.log(percentArray);
    tweakPercents(percentArray);
  };

  return (
    <>
      <Button
        onClick={grabPercents}
        color="success"
        //   onClick={tweakPercents}
      >
        Submit Changes
      </Button>
    </>
  );
}

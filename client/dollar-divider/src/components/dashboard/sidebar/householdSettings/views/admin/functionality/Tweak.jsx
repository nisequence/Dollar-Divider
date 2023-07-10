import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";
import { MdSave } from "react-icons/md";

export default function Tweak(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  let editable = props.editStatus;
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
        window.location.reload();
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
    sessionStorage.setItem("Percents", percentArray);
    tweakPercents(percentArray);
  };

  let displayButton = () => {
    if (editable === true) {
      return (
        <>
          <Button
            onClick={grabPercents}
            color="success"
            id="savePercents"
            //   onClick={tweakPercents}
          >
            <MdSave /> Submit
          </Button>
          <Tooltip isOpen={tooltipOpen} target="savePercents" toggle={toggle}>
            Responses must add to 100%!
          </Tooltip>
        </>
      );
    }
  };

  return <>{displayButton()}</>;
}

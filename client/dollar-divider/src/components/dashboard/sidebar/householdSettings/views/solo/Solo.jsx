import React from "react";
import Join from "./functionality/Join";
import New from "./functionality/New";

export default function Solo(props) {
  return (
    <>
      <h6>
        It looks like you don't have a household yet... Let's change that!
      </h6>
      <br></br>
      <Join token={props.token} />
      <br></br>
      <br></br>
      <New token={props.token} />
    </>
  );
}

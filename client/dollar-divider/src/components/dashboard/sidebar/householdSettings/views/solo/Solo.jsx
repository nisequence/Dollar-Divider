import React from "react";
import { Input, Button } from "reactstrap";
import Join from "./functionality/Join";
import New from "./functionality/New";

export default function Solo(props) {
  return (
    <>
      <h6>Welcome, Solo User!</h6>
      <br></br>
      <Join token={props.token} />
      <br></br>
      <br></br>
      <New token={props.token} />
    </>
  );
}

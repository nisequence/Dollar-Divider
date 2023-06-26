import React from "react";
import View from "./functionality/View";

export default function Member(props) {
  return (
    <>
      <h6>Welcome, Household Member!</h6>
      <View token={props.token} />
    </>
  );
}
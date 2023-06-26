import React from "react";
import View from "./functionality/View";

export default function Admin(props) {
  return (
    <>
      <h6>Welcome, Household Admin!</h6>
      <View token={props.token} />
    </>
  );
}
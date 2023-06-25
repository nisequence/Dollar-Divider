import React from "react";
import { useState, useEffect, useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
// import userModel from "../../../../../../../../../server/models/user.model";
let information = [];
export default function ProfileSettings() {
  const token = localStorage.getItem("token");

  // Retrieve User Profile Information
  const getUserInfo = async () => {
    let url = "http://localhost:4000/user/find";

    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // console.log("userData: ", data.findUser);
      let firstName = data.findUser.firstName;
      let lastName = data.findUser.lastName;
      let currentEmail = data.findUser.email;
      information = [];
      information.push(firstName);
      information.push(lastName);
      information.push(currentEmail);
      // console.log(information)
    } catch (err) {
      console.error(err);
    }
    return 
  };
  // Update User Information
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const updateUserInfo = async (e) => {
    e.preventDefault();

    let body = JSON.stringify({
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }); // Let because the body can be reassigned

    const url = "http://localhost:4000/user/adjust";

    const reqOptions = {
      method: "PATCH",
      headers: new Headers({
        Authorization: token,
        "Content-Type": "application/json",
      }),
      body: body, // The second body refers to the body object above.
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      console.log(data);
    } catch (err) {
      console.error(err);
    }

    // Try/catch = fetch w/request options within fetch
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: body, // The second body refers to the body object above.
      });

      alert("Success");
    } catch (err) {
      console.log(err);
    }
    // };
    return <></>;
  };
getUserInfo()
  return (
    <>
      <h2>Update User Information</h2>
      {/* <Form onSubmit={handleSubmit}> */}
      <Form id="formgroup" onSubmit={updateUserInfo}>
        <FormGroup>
          <h4>Current First Name: {information[0]}</h4>
          <Input
            placeholder="Update First Name"
            innerRef={firstNameRef}
            type="text"
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
        <h4>Current Last Name: {information[1]}</h4>
          <Input
            placeholder="Update Last Name"
            innerRef={lastNameRef}
            type="text"
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <h4>Current Email: {information[2]}</h4>
          <Input
            placeholder="Update Email"
            innerRef={emailRef}
            type="email"
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <h4>Enter New Password:</h4>
          <Input
            placeholder="Update Password"
            innerRef={passwordRef}
            type="password"
            autoComplete="off"
          />
        </FormGroup>
        <Button type="submit">Update</Button>
      </Form>
    </>
  );
}

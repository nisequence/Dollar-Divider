import React from "react";
import { useState, useEffect, useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { MdSave } from "react-icons/md";
// import userModel from "../../../../../../../../../server/models/user.model";
export default function ProfileSettings() {
  let [information, setInformation] = useState([]);
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
      let newInfo = [];
      newInfo.push(firstName);
      newInfo.push(lastName);
      newInfo.push(currentEmail);
      setInformation(newInfo);
      // console.log(information)
    } catch (err) {
      console.error(err);
    }
    return;
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

      if (data.message === "Profile successfully updated!") {
        //* Upon receiving server success message, reset information array of data
        let firstName = data.updateUser.firstName;
        sessionStorage.setItem("Name", firstName);
        getUserInfo();
        alert("Success");
      }
    } catch (err) {
      console.error(err);
    }

    // Try/catch = fetch w/request options within fetch
    //! The below code doesn't seem to be doing anything? the url is not a POST route and res is not being called
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: body, // The second body refers to the body object above.
      });
    } catch (err) {
      console.error(err);
    }
    // };
    return <></>;
  };

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  return (
    <>
      <h6>Update User Information</h6>
      <hr />
      {/* <Form onSubmit={handleSubmit}> */}
      <Form id="formgroup" onSubmit={updateUserInfo}>
        <FormGroup>
          <Label>
            <b>Current First Name: </b>
            <i>{information[0]}</i>
          </Label>
          <Input
            placeholder="Update First Name"
            innerRef={firstNameRef}
            type="text"
            autoComplete="off"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <b>Current Last Name: </b>
            <i>{information[1]}</i>
          </Label>
          <Input
            placeholder="Update Last Name"
            innerRef={lastNameRef}
            type="text"
            autoComplete="off"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <b>Current Email: </b>
            <i>{information[2]}</i>
          </Label>
          <Input
            placeholder="Update Email"
            innerRef={emailRef}
            type="email"
            autoComplete="off"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <b>Enter New Password:</b>
          </Label>
          <Input
            placeholder="Update Password"
            innerRef={passwordRef}
            type="password"
            autoComplete="off"
          />
        </FormGroup>
        <Button type="submit">
          <MdSave /> Save Changes
        </Button>
      </Form>
    </>
  );
}

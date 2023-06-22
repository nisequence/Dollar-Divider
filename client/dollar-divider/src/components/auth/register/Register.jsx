import { useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Register({ updateToken }) {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    //* Stop the page from refreshing when the form submits
    e.preventDefault();

    //* Creating a variable that holds each input's ref value
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    //* The server expects json, we need to build and json-ify a user object to send to our server
    let signUpObj = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    });

    const url = "http://localhost:4000/user/register";

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    const requestOptions = {
      headers,
      body: signUpObj,
      method: "POST",
    };

    // Use try/catch for our async fetch
    try {
      // Build an async fetch, fetch will use the url and requestOptions obj
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      // If the server send a success message we can proceed
      if (data.message === "New user created!") {
        updateToken(data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            placeholder="First Name"
            innerRef={firstNameRef}
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Last Name"
            innerRef={lastNameRef}
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Email address"
            innerRef={emailRef}
            type="email"
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Password"
            innerRef={passwordRef}
            type="password"
            autoComplete={"off"}
          />
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    </>
  );
}

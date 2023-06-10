import { useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
export default function Login({ updateToken }) {
  // This could also have been written: props.updateToken
  // Build our refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // Start base handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build my body object (request body)

    let body = JSON.stringify({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }); // Let because the body can be reassigned

    // Declare and init our url
    const url = "http://localhost:4000/user/login";
    // Try/catch = fetch w/request options within fetch
    try {
      // This is an alternative way of writing the fetch than we did before. It's more dense, but fewer lines.
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: body, // The second body refers to the body object above.
      });
      const data = await res.json(); // The .json takes the promise and makes it usable

      // Pass the data token value to my updateToken
      // If the server send a success message we can update token and route to room, if not we will get an alert
      if (data.message === "Login successful!") {
        updateToken(data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            placeholder="Email"
            innerRef={emailRef}
            type="email"
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Password"
            innerRef={passwordRef}
            type="password"
            autoComplete="off"
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </>
  );
}
// Signup is child of Auth.jsx, import below
// import Signup from "./signup/Signup";
import Register from "./register/Register";
import Login from "./login/Login";
// Container is Reactstrap's resizing div w/ grid rows and columns
// https://getbootstrap.com/docs/5.3/layout/grid/ (change class to className in jsx)
import { Col, Container, Row, Button } from "reactstrap";
import { useState } from "react";
import Logo from "./login/Logo";
export default function Auth(props) {
  //* useState to hold button's state login/sign-up
  const [button, setButton] = useState("New user? Sign-up here!");

  //* function to switch button from login to sign-up with setButton method
  const swapForm = () => {
    button === "Returning user? Login here!"
      ? setButton("New user? Sign-up here!")
      : setButton("Returning user? Login here!");
  };

  //* Ternary checks if button is set to "Login" message, if true user sees sign-up, if false user sees login
  const displayForm = () => {
    return button === "Returning user? Login here!" ? (
      <Register updateToken={props.updateToken} />
    ) : (
      <Login updateToken={props.updateToken} />
    );
  };

  return (
    <>
      <Container>
        <Row>
          <br></br>
        </Row>
        <Row>
          <Col md="6">
            <Button onClick={swapForm} color="dark">
              {button}
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="6">{displayForm()}</Col>
          <Col>
            <Logo />
          </Col>
        </Row>
        <Row>
          <br></br>
        </Row>
        <Row>
          <br></br>
        </Row>
        <Row>
          <br></br>
        </Row>
        <Row>
          <br></br>
        </Row>
      </Container>
    </>
  );
}

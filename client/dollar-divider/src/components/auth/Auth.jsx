// Signup is child of Auth.jsx, import below
// import Signup from "./signup/Signup";
import Register from "./register/Register";
import Login from "./login/Login";
// Container is Reactstrap's resizing div w/ grid rows and columns
// https://getbootstrap.com/docs/5.3/layout/grid/ (change class to className in jsx)
import { Col, Container, Row } from "reactstrap";

export default function Auth(props) {
  return (
    <>
      <Container>
        <Row>
          <Col md="6">
            {/* <Signup updateToken = {props.updateToken}/> */}
            <Register updateToken = {props.updateToken}/>
          </Col>
          <Col md="6">
            <Login updateToken = {props.updateToken}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

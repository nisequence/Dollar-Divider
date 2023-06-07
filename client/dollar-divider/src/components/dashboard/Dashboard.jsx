import { Col, Container, Row } from "reactstrap";

export default function Dashboard(props) {

  return (
    <>
      <Container>
        <Row>
          <Col>
            Test R1C1
          </Col>
          <Col>
            Test R1C2
          </Col>
        </Row>
        <Row>
          <Col>
            Test R2C1
          </Col>
          <Col>
            Test R2C2
          </Col>
        </Row>
      </Container>
    </>
  );
}

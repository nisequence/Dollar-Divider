import { Col, Container, Row } from "reactstrap";
// import dashboardImage from "../../../src/media/Dashboard_Layout.png"
import dashboardImage from "../../media/Dashboard_Layout.png";
import Bills from "./Bills";
export default function Dashboard(props) {
  return (
    <>
          {/* <Bills/> */}
      <Container>
        <Row>
          <Col>
          
          </Col>
        </Row>
        <Row>
          <Col
          
            // md="6"
            style={{
              width: "6em",
            }}
          >
            
            
            <img src = {dashboardImage} alt="image" />
          </Col>
        </Row>

      </Container>
    </>
  );
}

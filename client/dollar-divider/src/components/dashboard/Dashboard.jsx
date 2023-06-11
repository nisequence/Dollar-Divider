import { Col, Container, Row } from "reactstrap";
// import dashboardImage from "../../../src/media/Dashboard_Layout.png"
// import dashboardImage from "../../media/Dashboard_Layout.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Bills from "./Bills";
import Next from './Next';
import Previous from './Previous';
export default function Dashboard(props) {
  return (
    <>
      <Row>
        <div
          style={{
            height: "100vh",
            width: "20vw",
            border: "2em",
            backgroundColor: "gray",
          }}
        >
          {" "}
          <div
            style={{
              marginTop: "1em",
              color: "white",
              fontSize: "2.5em",
              fontFamily: "serif",
            }}
          >
            Dollar-Divider
          </div>
        </div>
        <div style={{
              marginTop: "1.5em",
              marginLeft: "1em",
              border: "solid gray 1em",
              borderRadius: ".5em",
              width: "30vw",
              height: "fit-content"
            }}> <div style={{
              marginTop: ".5em",
              fontSize: "2rem",
              fontFamily: "serif"
            }}> <Previous/> Upcoming Bills to Pay <Next /></div>
          <Bills style= {{height: "100%", width: "100%", padding: "1em", paddingTop: "3em"}}/>
        </div>
      </Row>
    </>
  );
}

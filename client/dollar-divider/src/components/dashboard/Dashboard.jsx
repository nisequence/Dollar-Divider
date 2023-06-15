import { Col, Container, Row } from "reactstrap";
// import dashboardImage from "../../../src/media/Dashboard_Layout.png"
// import dashboardImage from "../../media/Dashboard_Layout.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import UpcomingBills from "./UpcomingBills";
import CurrentBudgetStatus from "./CurrentBudgetStatus";
import RecentTransactions from "./RecentTransactions";
export default function Dashboard(props) {
  return (
    <>
      <div className="DashBody">
        <Col>
          <Sidebar />
        </Col>
        <Container>
          <Row>
            <Col className="bg-light border">
              {/* .col */}
              <UpcomingBills />
            </Col>
            <Col className="bg-light border">
              {/* .col */}
              <CurrentBudgetStatus />
            </Col>
            <Col className="bg-light border">
              {/* .col */}
              <RecentTransactions />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

import { Col, Container, Row } from "reactstrap";
// import dashboardImage from "../../../src/media/Dashboard_Layout.png"
// import dashboardImage from "../../media/Dashboard_Layout.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar/Sidebar";
import UpcomingBills from "./bills/UpcomingBills";
import CurrentBudgetStatus from "./budgets/currentBudgetStatus/CurrentBudgetStatus";
import Budgets from "./budgets/Budgets";
// import CurrentBudgetStatus from "./budgets/currentBudgetStatus/CurrentBudgetStatus";
import RecentTransactions from "./transactions/recentTransactions/RecentTransactions";
export default function Dashboard(props) {
  return (
    <>
      <div className="DashBody" id="dashbody">
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
              <Budgets />
              {/* <CurrentBudgetStatus /> */}
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

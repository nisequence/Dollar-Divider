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
import { useState, useEffect } from "react";

export default function Dashboard(props) {
  const [transactions, setTransactions] = useState([]);
  const getPersonalTransactions = async () => {

    //! Change the ID to a path parameter
    let url = "localhost:4000/transaction/mine/648f64ba57f975e3cfe03f3a";

    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // If the server does not provide a failure message
      if (data.message !== "No transactions found.") {

        setTransactions(data.getAllUserTrans); 
      } else {
        //! Send to 404 page
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      getPersonalTransactions();
    }
  }, [props.token]);


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
              <Budgets token={localStorage.getItem("token")} transactions = {transactions} />
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

import { Col, Container, Row } from "reactstrap";
// import dashboardImage from "../../../src/media/Dashboard_Layout.png"
// import dashboardImage from "../../media/Dashboard_Layout.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar/Sidebar";
import CurrentBudgetStatus from "./budgets/currentBudgetStatus/CurrentBudgetStatus";
import Budgets from "./budgets/Budgets";
// import CurrentBudgetStatus from "./budgets/currentBudgetStatus/CurrentBudgetStatus";
import RecentTransactions from "./transactions/recentTransactions/RecentTransactions";
import { useState, useEffect } from "react";
import Bills from "./bills/Bills";

export default function Dashboard(props) {
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);

  const getPersonalTransactions = async () => {
    //! Change the ID to a path parameter
    let url = "http://localhost:4000/transaction/mine";

    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    };

    try {
      // console.log("trying")
      const res = await fetch(url, reqOptions);
      const data = await res.json();
      // console.log("data",data)
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
    if (token) {
      getPersonalTransactions();
    }
  }, [token]);

  console.log(props.view);

  //todo Incorporate useEffect to dynamically refresh sections on new information
  return (
    <>
      <div className="DashBody" id="dashbody">
        <Col>
          <Sidebar
            setToken={props.setToken}
            setView={props.setView}
            view={props.view}
          />
        </Col>
        <Container>
          <Row>
            <Col className="bg-light border">
              {/* .col */}
              {/* <UpcomingBills /> */}
              <Bills view={props.view} />
            </Col>
            <Col className="bg-light border">
              {/* .col */}
              <Budgets
                view={props.view}
                token={token}
                transactions={transactions}
              />
            </Col>
            <Col className="bg-light border">
              {/* .col */}
              <RecentTransactions
                view={props.view}
                transactions={transactions}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

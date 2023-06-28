import { Col, Container, Row } from "reactstrap";
// import dashboardImage from "../../../src/media/Dashboard_Layout.png"
// import dashboardImage from "../../media/Dashboard_Layout.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar/Sidebar";
import Budgets from "./budgets/Budgets";
// import CurrentBudgetStatus from "./budgets/currentBudgetStatus/CurrentBudgetStatus";
import Transaction from "./transactions/Transaction";
import { useState, useEffect } from "react";
import Bills2 from "./bills/Bills2";
import AccountsList from "./accounts/AccountsList";

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

  //todo Incorporate useEffect to dynamically refresh sections on new information
  return (
    <>
      <div className="DashBody" id="dashbody">
        <Col>
          <Sidebar
            updateToken={props.updateToken}
            setView={props.setView}
            view={props.view}
            token={token}
            status={props.status}
          />
        </Col>
        <Container>
          <Row>
            <Col className="bg-light border">
              <br></br>
              <Bills2 view={props.view} token={token}></Bills2>
            </Col>
            <Col className="bg-light border">
              {/* .col */}
              <Budgets
                view={props.view}
                token={token}
                transactions={transactions}
              />
            </Col>
          </Row>
          <Row>
            <Col className="bg-light border">
              <AccountsList 
              view = {props.view}
              token={token}
              />
            </Col>
            <Col className="bg-light border">
              {/* .col */}
              <Transaction
                view={props.view}
                token={token}
                transactions={transactions}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
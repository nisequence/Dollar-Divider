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
import Split from "./Split/Split";
import GetAll from "./accounts/getAll/GetAll";

export default function Dashboard(props) {
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);

  const getPersonalTransactions = async () => {
    //! Change the ID to a path parameter
    let url = "http://localhost:4000/transaction/mine";

    const reqOptions = {
      method: "GET",
      headers: new Headers({ Authorization: token }),
      // headers: new Headers({Authorization: token}),
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

  // function GetAll() {
  let acctName;
  let acctBalance;
  let acctMinBalance;
  let allocations;
  let available;
  let acctOwnerID;
  let url;
  const [accounts, setAccounts] = useState([]);
  const getAccounts = async () => {
    url = "http://localhost:4000/finAccount/mine";
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();
      let information = data.getAllUserFinAccounts[0];
      // console.log("Accounts Data:",information)
      acctName = information.name;
      acctBalance = information.balance;
      acctMinBalance = information.balance;
      allocations = information.allocations;
      available = information.available;
      acctOwnerID = information.ownerID;
      // If the server does not provide a failure message
      if (data.message !== "No accounts found.") {
        setAccounts(data.getAllUserFinAccounts);
      } else {
        setAccounts(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      getAccounts();
    }
  }, [token, props.view]);

  const viewType = () => {
    if (props.view === false) {
      //* If viewing personal
      return (
        <AccountsList
          accounts={accounts}
          // balance = {props.balance}
          // minBalance = {props.minBalance}
          // allocations = {props.allocations}
          // ownerID = {props.ownerID}
          // available = {props.available}
          // getBudgets={getBudgets}
          // budgets={budgets}
          // transactions={props.transactions}
          token={props.token}
          view={props.view}
        />
      );
    } else {
      return <Split token={props.token} view={props.view} />;
    }
  };

  useEffect(() => {
    if (props.token) {
      viewType();
    }
  }, [props.token, props.view]);

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
              {/* <GetAll token={token} /> */}
              {/*               <AccountsList
                accounts={accounts}
                // balance = {props.balance}
                // minBalance = {props.minBalance}
                // allocations = {props.allocations}
                // ownerID = {props.ownerID}
                // available = {props.available}
                // getBudgets={getBudgets}
                // budgets={budgets}
                // transactions={props.transactions}
                token={props.token}
                view={props.view}
              /> */}
              {viewType()}
            </Col>
            <Col className="bg-light border">
              {/* .col */}
              <Transaction
                view={props.view}
                token={token}
                transactions={transactions}
                accounts={accounts}
                budgets={props.budgets}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

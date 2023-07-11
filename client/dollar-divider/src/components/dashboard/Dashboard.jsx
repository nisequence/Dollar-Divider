import { Col, Container, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar/Sidebar";
import Budgets from "./budgets/Budgets";
import Transaction from "./transactions/Transaction";
import { useState, useEffect } from "react";
import Bills from "./bills/Bills";
import AccountsList from "./accounts/AccountsList";
import Split from "./Split/Split";

export default function Dashboard(props) {
  // console.log('dashboardprops',props)
  let url;
  let acctName;
  let acctBalance;
  let acctMinBalance;
  let allocations;
  let available;
  let acctOwnerID;

  const token = localStorage.getItem("token");

  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const getTransaction = async () => {
    let viewValue = props.view;
    if (viewValue === true) {
      url = "http://localhost:4000/transaction/household";
    } else {
      url = "http://localhost:4000/transaction/mine";
    }
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    };
    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // console.log("getalltransdata", data)
      // If the server does not provide a failure message
      if (data.message !== "No transactions found.") {
        setTransaction(data.getAllTransactions);
      } else {
        setTransaction(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getSplitTransactions = async () => {
    //! Change the ID to a path parameter
    let viewValue = props.view;
    if (viewValue === true) {
      url = "http://localhost:4000/transaction/household";
    } else {
      url = "http://localhost:4000/transaction/mine";
    }
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
      // headers: new Headers({Authorization: token}),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();
      // If the server does not provide a failure message
      if (data.message !== "No transactions found.") {
        setTransactions(data.getTransactions);
      } else {
        setTransactions(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const setHouseholdTotal = async (data) => {
    let totalToDivide = 0;
    for (let x = 0; x < data?.length; x++) {
      let thisOne = data[x].budgetAmt;
      totalToDivide += thisOne;
    }
    // console.log("View set to", props.view, "setting total to", totalToDivide);
    sessionStorage.setItem("Total", totalToDivide);
  };

  const getBudgets = async () => {
    let viewValue = props.view;
    if (viewValue === true) {
      url = "http://localhost:4000/budget/household";
    } else {
      url = "http://localhost:4000/budget/mine";
    }
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // If the server does not provide a failure message
      if (data.message === "Budget(s) found!") {
        setBudgets(data.allBudgets);
        if (
          viewValue === true &&
          url === "http://localhost:4000/budget/household"
        ) {
          setHouseholdTotal(data.allBudgets);
        }
      } else {
        setBudgets(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //GetBudgets UseEffect
  useEffect(() => {
    if (token) {
      getBudgets();
    }
  }, [token, props.view]);

  //GetTransaction UseEffect
  useEffect(() => {
    if (token) {
      getTransaction();
    }
  }, [token, props.view]);

  //GetSplitTransactions UseEffect
  useEffect(() => {
    if (token) {
      getSplitTransactions();
    }
  }, [token, props.view]);

  // console.log('desktopsplittrans',transactions)
  // Get Accounts fetch
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

  // Get Accounts UseEffect
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
          token={token}
          view={props.view}
          transaction={transaction}
        />
      );
    } else {
      return (
        <Split
          token={token}
          view={props.view}
          transactions={transactions}
          transaction={transactions}
        />
      );
    }
  };

  useEffect(() => {
    if (token) {
      viewType();
    }
  }, [token, props.view]);

  // console.log("dashboardprops", props)
  // console.log("dashtransaction",transaction)

  return (
    <>
      <div className="DashBody" id="dashbody">
        <Col>
          <Sidebar
            updateToken={props.updateToken}
            setView={props.setView}
            view={props.view}
            token={token}
            // status={props.status}
          />
        </Col>
        <Container>
          <Row>
            <Col className="bg-light border">
              <br></br>
              <Bills
                view={props.view}
                token={token}
                getTransaction={getTransaction}
                getAccounts = {getAccounts}
                getBudgets={getBudgets}
              ></Bills>
            </Col>
            <Col className="bg-light border">
              {/* .col */}
              <Budgets
                view={props.view}
                token={token}
                transaction={transaction}
                getTransaction={getTransaction}
                getBudgets={getBudgets}
                budgets={budgets}

                // transactions={transactions}
              />
            </Col>
          </Row>
          <Row>
            <Col className="bg-light border">{viewType()}</Col>
            <Col className="bg-light border">
              {/* .col */}
              <Transaction
                view={props.view}
                token={token}
                accounts={accounts}
                budgets={budgets}
                // budgets={props.budgets}
                transaction={transaction}
                getTransaction={getTransaction}
                getBudgets={getBudgets}
                getAccounts={getAccounts}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

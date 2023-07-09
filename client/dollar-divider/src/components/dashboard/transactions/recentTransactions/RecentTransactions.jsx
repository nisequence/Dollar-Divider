import { React, useState, useRef, useEffect } from "react";
import {
  Table,
  Button,
  // UncontrolledModal,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { LuCalendarPlus, LuCalendarMinus } from "react-icons/lu";
import { DayPicker } from "react-day-picker";
import { GrEdit } from "react-icons/gr";
import { v4 } from "uuid";
import AddTransaction from "../addTransaction/AddTransaction";

export default function RecentTransactions(props) {
  // console.log("recenttransactionsprops", props);
  let base;
  let transactionID;
  let month;
  let day;
  let tempColor;
  let transactionType;
  let url;
  let categoryOptions = [];
  let newArray = [];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const recentTransactions = [];
  const janArray = [];
  const febArray = [];
  const marchArray = [];
  const aprilArray = [];
  const mayArray = [];
  const juneArray = [];
  const julyArray = [];
  const augustArray = [];
  const septArray = [];
  const octArray = [];
  const novArray = [];
  const decArray = [];
  let transInfo = [];
  let colorAssignment = 0;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [state, setState] = useState(true);
  const [selected, setSelected] = useState();
  const [currentMonth, setCurrentMonth] = useState(7);

  // const [selected, setSelected] = React.useState();

  if (state === true) {
    transactionType = "expense";
  } else {
    transactionType = "income";
  }

  const toggleToolTip = () => setTooltipOpen(!tooltipOpen);

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    if (props.token) {
      getBudgets();
    }
  }, [props.token, props.view]);

  const getBudgets = async () => {
    let viewValue = props.view;
    if (viewValue == true) {
      url = "http://localhost:4000/budget/household";
    } else {
      url = "http://localhost:4000/budget/mine";
    }
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();
      // console.log("recenttransactionsdata",data)
      newArray.push(data);
      // If the server does not provide a failure message
      if (data.message !== "No personal budgets found.") {
        // setBudgets(data.allBudgets);
        // categoryOptions = [];
        data.allBudgets.map((item) => {
          categoryOptions.push(item);
        });
      } else {
        // setBudgets(null);
        console.log("no budget data found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //* Use useRef to get values from each input
  const descRef = useRef();
  const merchantRef = useRef();
  const amountRef = useRef();
  const finAccountRef = useRef();
  const categoryRef = useRef();

  // Set base to match props.view (should be useEffect?)
  if (props.view === false) {
    base = "personal";
  } else {
    base = "household";
  }

  // ! Inspired By Kate
  // Slice the Day and Month from the calendar, and convert months to full names to match backend
  if (selected) {
    month = selected.toString().slice(4, 7);
    if (month === "Jan") {
      month = "January";
    }
    if (month === "Feb") {
      month = "February";
    }
    if (month === "Mar") {
      month = "March";
    }
    if (month === "Apr") {
      month = "April";
    }
    if (month === "Jun") {
      month = "June";
    }
    if (month === "Jul") {
      month = "July";
    }
    if (month === "Aug") {
      month = "August";
    }
    if (month === "Sep") {
      month = "September";
    }
    if (month === "Oct") {
      month = "October";
    }
    if (month === "Nov") {
      month = "November";
    }
    if (month === "Dec") {
      month = "December";
    }
    sessionStorage.setItem("month:", month);
  }
  if (selected) {
    day = parseInt(selected.toString().slice(8, 10));
  }
  if (month && day) {
  }
  // ! End Inspired By Kate

  //Todo Update Transaction Functionality for the Edit Menu
  const updateTransaction = async (id) => {
  // const updateTransaction = async (id) => {
    const desc = descRef.current.value;
    const amount = amountRef.current.value;
    const category = categoryRef.current.value;
    const merchant = merchantRef.current.value;
    const finAccount = finAccountRef.current.value;

    let url = `http://localhost:4000/transaction/edit/${id}`;
    // let url = `http://localhost:4000/transaction/edit/${id}`;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    const updateObj = JSON.stringify({
      month: month,
      day: day,
      desc: desc,
      merchant: merchant,
      amount: amount,
      finAccount: finAccount,
      category: category,
      type: transactionType,
      base: base,
    });

    let requestOptions = {
      headers: myHeaders,
      body: updateObj,
      method: "PATCH",
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      if (data.message === `Transaction has been updated successfully`) {
        props.getTransaction();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Transaction Functionality for the Edit Menu
  const deleteTransaction = async (id) => {
    let url = `http://localhost:4000/transaction/delete/${id}`;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      if (data.message === "Transaction was successfully deleted!") {
        props.getTransaction();
      }
    } catch (error) {
      console.error(error);
    }
  };

  function mapMonth(curr) {
    transInfo[months[curr - 1]]?.map((transaction) => {
      // abbreviate month names for the table
      let monthArray = [];
      let month = transaction.month;

      // abbreviate month names for the table
      function abbrMonth() {
        for (let i = 0; i < month.length; i++) {
          monthArray.push(month[i]);
        }
        monthArray.length = 3;
      }
      abbrMonth();

      // redefine month to abbreviate month names
      month = monthArray[0] + monthArray[1] + monthArray[2] + " ";

      // Add table striping
      if (colorAssignment === 0) {
        tempColor = "table-success";
        colorAssignment = 1;
      } else {
        tempColor = "table-secondary";
        colorAssignment = 0;
      }

      // correctly display numbers with dollar signs and negative symbols
      let displayNumber;
      transaction.amount = +transaction.amount;
      if (transaction.amount < 0) {
        let tempNumber = transaction.amount.toLocaleString("en-US");
        let prefix = "-$";
        tempNumber = tempNumber.slice(1);
        displayNumber = prefix + tempNumber;
      } else {
        displayNumber = `$${transaction.amount.toLocaleString("en-US")}`;
      }
      // !PastedEditTransactionInfoCode Starting

      // Set the base view, could be useEffect?
      if (props.view === false) {
        base = "personal";
      } else {
        base = "household";
      }

      //! Reenabled Code Start

      // Toggle Income or Expense
      function incomeExpenseToggle() {
        setState(!state);
      }

      //! PastedEditTransactionCode Ending
      // Return for the table rows
      return recentTransactions.push(
        <tr className={tempColor}>
          <td>{month + transaction.day}</td>
          {/* <td>{transaction.desc}</td> */}
          <td>{displayNumber.toLocaleString("en-US")}</td>
          <td>{transaction.merchant}</td>
          <td>{transaction.category}</td>
          <td>{transaction.finAccount}</td>
          <td>
            {/* Edit Button */}
            <Button
              onClick={() => {
                toggleModal();
                transactionID = transaction._id;
              }}
              id="UncontrolledModalEditTransaction"
              // id="UncontrolledPopoverEditTransaction"
              color="secondary"
              type="button"
              // trigger="legacy"
              style={{
                height: "1.5em",
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <GrEdit />
            </Button>
            <Tooltip
              isOpen={tooltipOpen}
              target="UncontrolledModalEditTransaction"
              toggle={toggleToolTip}
            >
              Edit a Transaction
            </Tooltip>
            <Modal isOpen={modal} fade={false} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>Edit Transaction</ModalHeader>
              <ModalBody>
                <>
                  <Form onSubmit={() => console.log("form submitted")}>
                    {/* Name of Item */}
                    <FormGroup>
                      <Input
                        placeholder="Name of Item"
                        innerRef={descRef}
                        autoComplete="off"
                        type="text"
                        required
                      />
                    </FormGroup>
                    {/* Cost */}
                    <FormGroup>
                      <Input
                        placeholder="Cost"
                        innerRef={amountRef}
                        autoComplete="off"
                        type="number"
                        required
                      />
                    </FormGroup>
                    {/* Merchant Name */}
                    <FormGroup>
                      <Input
                        placeholder="Merchant"
                        innerRef={merchantRef}
                        autoComplete="off"
                        type="text"
                        required
                      />
                    </FormGroup>
                    {/* Income vs Expense */}
                    <Label>Expense</Label>
                    <FormGroup switch>
                      <Input
                        type="switch"
                        role="switch"
                        checked={!state}
                        onClick={() => {
                          incomeExpenseToggle();
                        }}
                      />
                      <Label check>Income</Label>
                    </FormGroup>
                    {/* Choose Category */}
                    <FormGroup>
                      <Label for="exampleSelectMulti">Choose Category</Label>
                      <Input
                        id="exampleSelect1"
                        name="select"
                        type="select"
                        innerRef={categoryRef}
                        required
                      >
                        {props.budgets?.map((each) => {
                          return (
                            <>
                              <option>{each.budgetCat}</option>
                            </>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    {/* Choose Date */}
                    <FormGroup>
                      <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                      />
                    </FormGroup>
                    {/* Choose Account */}
                    <FormGroup>
                      <Label for="exampleSelectMulti">Choose Account</Label>
                      <Input
                        id="exampleSelect1"
                        name="select"
                        type="select"
                        innerRef={finAccountRef}
                        // innerRef={categoryRef}
                        required
                      >
                        {props.accounts?.map((a) => {
                          return (
                            <>
                              <option> {a.name}</option>
                            </>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    {/* Check # */}
                  </Form>
                </>
                <ModalFooter>
                  {/* UpdateTransaction Button */}
                  <Button
                    onClick={() => updateTransaction(transactionID)}
                    color="success"
                    type="submit"
                  >
                    Update
                  </Button>
                  {/* Delete Transaction Button */}
                  <Button
                    key={v4}
                    onClick={() => deleteTransaction(transactionID)}
                    color="danger"
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalBody>
            </Modal>
            {/* </UncontrolledPopover> */}
          </td>
        </tr>
      );
    });
  }

  // Start with sortedTransactions being the props.transaction
  let sortedTransactions = props.transaction;
  // console.log("sorted",sortedTransactions)
  // Change sortedTransactions sorting All Transactions by day
  function sortByDay() {
    sortedTransactions.sort((a, b) => {
      return a.day - b.day;
    });
  }

  sortByDay();

  function createMonthsObjects() {
    // January
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("January")) {
        janArray.push(sortedTransactions[i]);
      }
    }
    // February
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("February")) {
        febArray.push(sortedTransactions[i]);
      }
    }
    // March
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("March")) {
        marchArray.push(sortedTransactions[i]);
      }
    }
    // April
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("April")) {
        aprilArray.push(sortedTransactions[i]);
      }
    }
    // May
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("May")) {
        mayArray.push(sortedTransactions[i]);
      }
    }
    // June
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("June")) {
        juneArray.push(sortedTransactions[i]);
      }
    }
    // July
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("July")) {
        julyArray.push(sortedTransactions[i]);
      }
    }
    // August
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("August")) {
        augustArray.push(sortedTransactions[i]);
      }
    }
    // September
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("September")) {
        septArray.push(sortedTransactions[i]);
      }
    }
    // October
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("October")) {
        octArray.push(sortedTransactions[i]);
      }
    }
    // November
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("November")) {
        novArray.push(sortedTransactions[i]);
      }
    }
    // December
    for (let i = 0; i < sortedTransactions.length; i++) {
      if (sortedTransactions[i].month.includes("December")) {
        decArray.push(sortedTransactions[i]);
      }
    }
  }

  createMonthsObjects();
  transInfo.January = janArray;
  transInfo.February = febArray;
  transInfo.March = marchArray;
  transInfo.April = aprilArray;
  transInfo.May = mayArray;
  transInfo.June = juneArray;
  transInfo.July = julyArray;
  transInfo.August = augustArray;
  transInfo.September = septArray;
  transInfo.October = octArray;
  transInfo.November = novArray;
  transInfo.December = decArray;

  const addMonth = () => {
    if (currentMonth < 12) {
      setCurrentMonth(currentMonth + 1);
      mapMonth(currentMonth);
    }
  };

  const subtractMonth = () => {
    if (currentMonth > 1) {
      setCurrentMonth(currentMonth - 1);
      {
        mapMonth(currentMonth);
      }
    }
  };

  mapMonth(currentMonth);
  return (
    <>
      <div className="RecentTransactions">
      <AddTransaction
            token={props.token}
            view={props.view}
            getTransaction={props.getTransaction}
            accounts={props.accounts}
            getBudgets={props.getBudgets}
            budgets={props.budgets}
            getAccounts = {props.getAccounts}
          />
        <div id="recenttransactionsmonth">
          <Button id="monthLeftBtn" onClick={subtractMonth}>
            <LuCalendarMinus />
          </Button>
          <div id="rtMonthName">{months[currentMonth - 1]}</div>
          <Button id="monthRightBtn" onClick={addMonth}>
          <LuCalendarPlus />
          </Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              {/* <th>Desc</th> */}
              <th>Amount</th>
              <th>Merchant</th>
              {/* <th>
        Manual Entry
      </th> */}
              <th>Category</th>
              <th>
        Account
      </th>
              <th></th>
              {/* <th>
        Personal/Household
      </th> */}
            </tr>
          </thead>
          {/* <tbody>{transactions}</tbody> */}
          <tbody id="recenttransactionstable">{recentTransactions}</tbody>
          {/* <tbody>{recentTransactions}</tbody> */}
        </Table>
      </div>
    </>
  );
}

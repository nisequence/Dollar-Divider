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
import DeleteTransaction from "./deleteTransaction/DeleteTransaction";
import EditTransaction from "./editTransaction/EditTransaction";
export default function RecentTransactions(props) {
  let base;
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
  let today = new Date();
  let thisMonth = today.getMonth() + 1;
  // let thisCurrentDay = today.getDate();
  // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  // const [currentDay, setCurrentDay] = useState();
  // setCurrentMonth(7)
  // setCurrentMonth(thisMonth)
  // setCurrentDay(thisCurrentDay)
  //! const [transactionsDisplay, setTransactionsDisplay] = useState(false);
  // Set the type of transaction (income vs expense)
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
      // props.getBudgets();
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
      newArray.push(data);
      // If the server does not provide a failure message
      // console.log("data.message:",data.message)
      if (data.message !== "No personal budgets found." || data.message !== "No household budgets found.") {
        // console.log("budgets found in recent transactions")
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
    id = id;
    const desc = descRef.current.value;
    // if (descRef.current.value != null) {desc = descRef.current.value;} else {desc = transaction.amount}
    const amount = amountRef.current.value;
    // if (!amountRef) {amount = transaction.amount}
    const category = categoryRef.current.value;
    // if (!category) {category = transaction.category}
    const merchant = merchantRef.current.value;
    // if (!merchant) {merchant = transaction.merchant}
    const finAccount = finAccountRef.current.value;
    // if (!finAccount) {finAccount = transaction.finAccount}
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

  function mapMonth(curr) {
    // Maps through the Transactions sorted into Months Arrays to find the Current Month to Display
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

      // https://www.geeksforgeeks.org/how-to-use-handlechange-function-in-react-component/
      // let [Name, setname] = useState('');

      // const handleChange = (event) => {
      //   setname(event.target.value);
      // }

      return recentTransactions.push(
        <tr className={tempColor}>
          {/* <tr key={transInfo[months[curr - 1]]?.indexOf(transaction)} className={tempColor}> */}
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
                // transactionID = transaction._id;
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
              <ModalHeader>Edit Transaction</ModalHeader>
              {/* <ModalHeader toggle={toggleModal}>Edit Transaction</ModalHeader> */}
              <ModalBody>
                <>
                  <Form
                    onSubmit={() =>
                      console.log(
                        "edit transaction submitted, why we console.log again?"
                      )
                    }
                  >
                    {/* Name of Item */}
                    <FormGroup>
                      <Input
                        placeholder={transaction.merchant}
                        // placeholder="Name of Item"
                        innerRef={descRef}
                        autoComplete="off"
                        type="text"
                        required
                      />
                    </FormGroup>
                    {/* Cost */}
                    <FormGroup>
                      <Input
                        placeholder={transaction.amount}
                        // placeholder="Cost"
                        innerRef={amountRef}
                        autoComplete="off"
                        type="number"
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
                              <option key={props.budgets.indexOf(each)}>{each.budgetCat}</option>
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
                              <option key={props.accounts.indexOf(a)}> {a.name}</option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    {/* Check # */}
                  </Form>
                </>
                <ModalFooter>
                  {/* UpdateTransaction Button */}
                  {/* <EditTransaction
                  
                  // id = {transaction._id}
                  // token  = {props.token}
                  // getTransaction = {props.getTransaction}
                  // month = {month}
                  // day = {day}
                  // desc = {descRef}
                  // merchant = {merchantRef}
                  // amount = {amountRef}
                  // finAccount = {finAccountRef}
                  // category = {categoryRef}
                  // transactionType = {transactionType}
                  // base = {base}
                  /> */}
                  {/* <Button
                    onClick={() => updateTransaction(transaction._id)}
                    color="success"
                    type="submit"
                  >
                    Update
                  </Button> */}
                  {/* Delete Transaction Button */}
                  <DeleteTransaction
                    id={transaction._id}
                    token={props.token}
                    getTransaction={props.getTransaction}
                  />
                  {/* <Button
                    key={v4}
                    onClick={() => deleteTransaction(transaction._id)}
                    color="danger"
                  >
                    Delete
                  </Button> */}
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

  // console.log("sortedTransactions",sortedTransactions)
  // console.log("transInfo:",transInfo)

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

  // useEffect(() => {
  //   if (transactionsDisplay === false) {
  //     props.getTransaction();
  //     mapMonth(currentMonth);
  //     // mapMonth(8);
  //     setTransactionsDisplay(true);
  //     console.log("ding")
  //   }
  // })

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
          getAccounts={props.getAccounts}
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
              <th>Account</th>
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

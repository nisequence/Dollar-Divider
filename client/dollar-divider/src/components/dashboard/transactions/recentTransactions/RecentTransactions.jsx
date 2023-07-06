import { useState, useRef, useEffect } from "react";
import {
  Table,
  Button,
  // PopoverHeader,
  // UncontrolledPopover,
  // PopoverBody,
  // UncontrolledModal,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  // Alert
} from "reactstrap";
import { v4 } from "uuid";
import AddTransaction from "../addTransaction/AddTransaction";
import EditTransactionInfo from "../editTransactionInfo/EditTransactionInfo";
let transactionID;
let categoryOptions = [];
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

export default function RecentTransactions(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleToolTip = () => setTooltipOpen(!tooltipOpen);
  
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);


  const transactionsToDelete = [
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

  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  useEffect(() => {
    if (props.token) {
      getBudgets();
    }
  }, [props.token, props.view]);

  // let categoryOptions = [];
  let url;
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

      // If the server does not provide a failure message
      if (data.message !== "No personal budgets found.") {
        // setBudgets(data.allBudgets);
        categoryOptions = [];
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

  //* Dropdown settings
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  //* Use useRef to get values from each input
  const monthRef = useRef();
  const dayRef = useRef();
  const descRef = useRef();
  const merchantRef = useRef();
  const amountRef = useRef();
  const checkNumRef = useRef();
  //const manualEntryRef= useRef();
  const finAccountRef = useRef();
  const categoryRef = useRef();
  const typeRef = useRef();

  let base;
  if (props.view === false) {
    base = "personal";
  } else {
    base = "household";
  }

  // Functionality for the Edit Menu
  const updateTransaction = async (id) => {
    let url = `http://localhost:4000/transaction/edit/${id}`;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
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
  // Functionality for the Edit Menu
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

  const recentTransactions = [];
  let colorAssignment = 0;
  let tempColor;

  function mapMonth(curr) {
    transInfo[months[curr-1]]?.map((transaction) => {

      // abbreviate month names for the table
      let monthArray = [];
      let month = transaction.month;
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

      // Return for the table rows
      return recentTransactions.push(
        <tr className={tempColor}>
          <td>{month + transaction.day}</td>
          <td>{transaction.desc}</td>
          <td>{displayNumber.toLocaleString("en-US")}</td>
          <td>{transaction.merchant}</td>
          <td>{transaction.category}</td>
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
              edit
            </Button>
            <Tooltip
        isOpen={tooltipOpen}
        target="UncontrolledModalEditTransaction"
        toggle={toggleToolTip}
      >
        Add a Transaction
      </Tooltip>
            <Modal
              isOpen={modal}
              fade={false}
              toggle={toggleModal}
            >
              <ModalHeader toggle={toggleModal}>Edit Transaction</ModalHeader>
              <ModalBody>
                <EditTransactionInfo
                  token={props.token}
                  view={props.view}
                  month={props.month}
                  accounts={props.accounts}
                  categoryOptions={categoryOptions}
                />
                <ModalFooter>
                  <Button
                    onClick={() => updateTransaction(transactionID)}
                    color="success"
                    type="submit"
                  >
                    Update
                  </Button>
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

  // Change sortedTransactions sorting All Transactions by day
  function sortByDay() {
    sortedTransactions.sort((a, b) => {
      return a.day - b.day;
    });
  }
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
  sortByDay();
  let transInfo = [];
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
  let [currentMonth, setCurrentMonth] = useState(7);
  // let currentMonth = 2;

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
      setCurrentMonth(currentMonth -1 );
      // mapMonth()
      {
        mapMonth(currentMonth);
      }
    }
    // else {
    //   currentMonth = 12
    // }
  };
  mapMonth(currentMonth);
  // let viewMonthInfo = [transInfo[currentMonth]]
  let transactions = transInfo.July;
  // console.log("recenttransactionsprops:",props)
  return (
    <>
    <div className="RecentTransactions">
      <div id="recenttransactionsmonth">
      <Button id="monthLeftBtn" onClick={subtractMonth}>-</Button>
      <div id="rtMonthName">{months[currentMonth -1]}</div>
      <Button id="monthRightBtn" onClick={addMonth}>+</Button>
      </div>
      <Table>
        <AddTransaction
          token={props.token}
          view={props.view}
          getTransaction={props.getTransaction}
          accounts={props.accounts}
        />
        <thead>
          <tr>
            <th>Date</th>
            <th>Desc</th>
            <th>Amount</th>
            <th>Merchant</th>
            {/* <th>
        Manual Entry
      </th> */}
            <th>Category</th>
            {/* <th>
        Account
      </th> */}
            <th>Edit</th>
            {/* <th>
        Personal/Household
      </th> */}
          </tr>
        </thead>
        {/* <tbody>{transactions}</tbody> */}
        <tbody>{recentTransactions}</tbody>
        {/* <tbody>{recentTransactions}</tbody> */}
      </Table>
    </div>
    </>
  );
}

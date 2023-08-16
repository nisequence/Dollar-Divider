import { React, useState, useRef, useEffect } from "react";
import {
  Table,
  Button,
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
import AddTransaction from "../addTransaction/AddTransaction";
import DeleteTransaction from "./deleteTransaction/DeleteTransaction";
import EditTransaction from "./editTransaction/EditTransaction";
import DisplayTransactions from "./DisplayTransactions/DisplayTransactions";
export default function RecentTransactions(props) {
  let base;

  let recentTransactions = props.transaction;

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

  let today = new Date();
  let thisMonth = today.getMonth() + 1;
  let thisYear = today.getFullYear();

  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  const [currentYear, setCurrentYear] = useState(thisYear);
  const monthYear = [currentMonth, currentYear];
  console.log("MonthYear Filter:", monthYear);

  // Set base to match props.view (should be useEffect?)
  if (props.view === false) {
    base = "personal";
  } else {
    base = "household";
  }

  console.log(props.transaction);

  const addMonth = () => {
    if (currentMonth < 12) {
      setCurrentMonth(currentMonth + 1);
    } else {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    }
  };

  const subtractMonth = () => {
    if (currentMonth > 1) {
      setCurrentMonth(currentMonth - 1);
    } else {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    }
  };

  let filteredTransactions = props.transaction.filter((each) => {
    let remainingItems =
      each.month === months[currentMonth - 1] && each.year === monthYear[1];
    return remainingItems;
  });
  console.log("Filtered Transactions by Month & Year", filteredTransactions);

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
          <div id="rtMonthName">
            {months[currentMonth - 1]} {currentYear}
          </div>
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
          <tbody id="recenttransactionstable">
            <DisplayTransactions
              token={props.token}
              monthYear={monthYear}
              filteredTransactions={filteredTransactions}
              getTransactions={props.getTransaction}
              view={props.view}
              accounts={props.accounts}
              budgets={props.budgets}
            />
          </tbody>
          {/* <tbody>{recentTransactions}</tbody> */}
        </Table>
      </div>
    </>
  );
}

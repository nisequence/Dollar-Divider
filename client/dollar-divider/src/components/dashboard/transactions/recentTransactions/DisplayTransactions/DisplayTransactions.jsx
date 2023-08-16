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
import { DayPicker } from "react-day-picker";
import { GrEdit } from "react-icons/gr";
import DeleteTransaction from "../deleteTransaction/DeleteTransaction";
import EditTransaction from "../editTransaction/EditTransaction";

export default function DisplayTransactions(props) {
  let month;
  let day;
  let tempColor;
  let colorAssignment = 0;

  const [state, setState] = useState(true);
  const [selected, setSelected] = useState();

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleToolTip = () => setTooltipOpen(!tooltipOpen);

  const toggleModal = () => setModal(!modal);
  const [modal, setModal] = useState(false);

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

  //* Use useRef to get values from each input
  const merchantRef = useRef();
  const amountRef = useRef();
  const finAccountRef = useRef();
  const categoryRef = useRef();

  console.log("Display input", props.filteredTransactions);

  // Maps through the Transactions that have already been filtered
  const displayCurrent = props.filteredTransactions?.map((transaction) => {
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

    // Toggle Income or Expense
    function incomeExpenseToggle() {
      setState(!state);
    }

    // Return for the table rows

    // https://www.geeksforgeeks.org/how-to-use-handlechange-function-in-react-component/
    // let [Name, setname] = useState('');

    // const handleChange = (event) => {
    //   setname(event.target.value);
    // }

    return (
      <tr
        className={tempColor}
        key={props.filteredTransactions.indexOf(transaction)}
      >
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
            Edit this Transaction
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
                      innerRef={merchantRef}
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
                          <option key={props.budgets.indexOf(each)}>
                            {each.budgetCat}
                          </option>
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
                          <option key={props.accounts.indexOf(a)}>
                            {" "}
                            {a.name}
                          </option>
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
  return <>{displayCurrent}</>;
}

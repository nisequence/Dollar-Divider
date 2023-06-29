import { useState, useRef } from "react";
import {
  Table,
  Button,
  PopoverHeader,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";
import { v4 } from "uuid";
import AddTransaction from "../addTransaction/AddTransaction";
import EditTransactionInfo from "../editTransactionInfo/EditTransactionInfo";
let transactionID;
export default function RecentTransactions(props) {
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
  let categoryOptions = props.budgets;
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

  const submitTrans = async (e) => {
    e.preventDefault();
    const desc = descRef.current.value;
    const amount = amountRef.current.value;
    const month = monthRef.current.value;
    const day = dayRef.current.value;
    const category = categoryRef.current.value;
    const merchant = merchantRef.current.value;
    const checkNumber = checkNumRef.current.value;
    //const manualEntry = manualEntryRef.current.value;
    const finAccount = finAccountRef.current.value;
    const type = typeRef.current.value;

    let transObj = JSON.stringify({
      month: month,
      day: day,
      desc: desc,
      merchant: merchant,
      amount: amount,
      checkNumber: checkNumber,
      //manualEntry: true,
      finAccount: finAccount,
      category: category,
      type: type,
      base: base,
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    const reqOption = {
      headers: headers,
      body: transObj,
      method: "POST",
    };

    try {
      let url = "/"; //Todo remove this and replace with correct information
      const res = await fetch(url, reqOption);
      const data = await res.json();

      // If the server provides a success message
      if (
        data.message === "You have created a new transaction!" ||
        data.message === "Your household has a new transaction!"
      ) {
        props.getTransaction();
      } else {
        // Do nothing, maybe build an error component later to tell the user to re-configure their item
        console.error("User is unauthorized.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updatingTransaction = (id) => {
    console.log("updating Transaction", id);
  };

  const cancelEditing = () => {
    console.log("cancel editing button clicked");
  };

  const deleteTransaction = (id) => {
    console.log("Delete Transaction", id);
    let url = `http://localhost:4000/transaction/delete/${id}`;

    // async function delete()
    //! Example Code Start
    // async function deleteMovie(id) {
    //   const url = `http://localhost:4000/movies/${id}`;

      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);

      let requestOptions = {
        headers: myHeaders,
        method: "DELETE",
      };

    //   try {
    //     let response = await fetch(url, requestOptions);
    //     let data = await response.json();

    //     if (data) {
    //       props.fetchMovies();
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    //! Example Code End
  };

  const recentTransactions = [];
  let colorAssignment = 0;
  let tempColor;

  props.transactions?.map((transaction) => {
    // console.log("transid",transaction._id)
    // let id = transaction._id;
    let monthArray = [];
    let month = transaction.month;
    function mapMonth() {
      for (let i = 0; i < month.length; i++) {
        monthArray.push(month[i]);
      }
      monthArray.length = 3;
    }
    mapMonth();
    month = monthArray[0] + monthArray[1] + monthArray[2] + " ";
    if (colorAssignment === 0) {
      tempColor = "table-success";
      colorAssignment = 1;
    } else {
      tempColor = "table-secondary";
      colorAssignment = 0;
    }
    return recentTransactions.push(
      <tr className={tempColor}>
        <td>{month + transaction.day}</td>
        <td>{transaction.desc}</td>
        <td>${transaction.amount}</td>
        <td>{transaction.merchant}</td>
        <td>{transaction.category}</td>
        <td>
          <Button
            onClick={() => {
              transactionID = transaction._id
              console.log(transactionID)
            }}
            id="UncontrolledPopoverEditTransaction"
            color="secondary"
            type="button"
            style={{
              height: "1.5em",
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            edit
          </Button>
          <UncontrolledPopover
            placement="top"
            target="UncontrolledPopoverEditTransaction"
          >
            <PopoverHeader>Edit Transaction</PopoverHeader>
            <PopoverBody>
              <EditTransactionInfo
                token={props.token}
                view={props.view}
                month={props.month}
              />
              <Button
                onClick={() => updatingTransaction(transactionID)}
                color="success"
                type="submit"
              >
                {/* <Button onClick={updatingTransaction} color="success" type="submit"> */}
                Update
              </Button>
              <Button
                // key={v4}
                onClick={cancelEditing}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                key={v4}
                onClick={() => deleteTransaction(transactionID)}
                color="danger"
              >
                {/* <Button onClick={deleteTransaction(id)} color="danger"> */}
                Delete
              </Button>
            </PopoverBody>
          </UncontrolledPopover>
        </td>
      </tr>
    );
  });
  console.log(recentTransactions);
  return (
    <div className="RecentTransactions">
      <Table>
        <AddTransaction
          token={props.token}
          view={props.view}
          getTransaction={props.getTransaction}
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
        <tbody>{recentTransactions}</tbody>
      </Table>
    </div>
  );
}

import { useState, useRef,useEffect } from "react";
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
  // Alert
} from "reactstrap";
import { v4 } from "uuid";
import AddTransaction from "../addTransaction/AddTransaction";
import EditTransactionInfo from "../editTransactionInfo/EditTransactionInfo";
let transactionID;
let categoryOptions = []
export default function RecentTransactions(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  
  // console.log("account list:",props.accounts)

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
        // console.log("budgetdata:",data.allBudgets)
        categoryOptions = [];
        data.allBudgets.map((item) => {
          // console.log("budgetCat:",item.budgetCat)
          categoryOptions.push(item)
        })
       } else {
        // setBudgets(null);
        console.log("no budget data found")
      }
    } catch (err) {
      console.error(err);
    }
  };
  // console.log("catoptions", categoryOptions)


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

  

  // const submitTrans = async (e) => {
  //   e.preventDefault();
  //   const desc = descRef.current.value;
  //   const amount = amountRef.current.value;
  //   const month = monthRef.current.value;
  //   const day = dayRef.current.value;
  //   const category = categoryRef.current.value;
  //   const merchant = merchantRef.current.value;
  //   const checkNumber = checkNumRef.current.value;
  //   //const manualEntry = manualEntryRef.current.value;
  //   const finAccount = finAccountRef.current.value;
  //   const type = typeRef.current.value;

  //   let transObj = JSON.stringify({
  //     month: month,
  //     day: day,
  //     desc: desc,
  //     merchant: merchant,
  //     amount: amount,
  //     checkNumber: checkNumber,
  //     //manualEntry: true,
  //     finAccount: finAccount,
  //     category: category,
  //     type: type,
  //     base: base,
  //   });

  //   let headers = new Headers();
  //   headers.append("Content-Type", "application/json");
  //   headers.append("Authorization", props.token);

  //   const reqOption = {
  //     headers: headers,
  //     body: transObj,
  //     method: "POST",
  //   };

  //   try {
  //     let url = "/"; //Todo remove this and replace with correct information
  //     const res = await fetch(url, reqOption);
  //     const data = await res.json();

  //     // If the server provides a success message
  //     if (
  //       data.message === "You have created a new transaction!" ||
  //       data.message === "Your household has a new transaction!"
  //     ) {
  //       props.getTransaction();
  //     } else {
  //       // Do nothing, maybe build an error component later to tell the user to re-configure their item
  //       console.error("User is unauthorized.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const updateTransaction = async (id) => {
    console.log("updating Transaction", id);
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

  const deleteTransaction = async (id) => {
    // console.log("Deleting Transaction", id);
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
      if (data.message === "Transaction was successfully deleted!"){
        props.getTransaction()
      }
    } catch (error) {
      console.error(error);
    }
  };

  const recentTransactions = [];
  let colorAssignment = 0;
  let tempColor;

  props.transaction?.map((transaction) => {
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

    return recentTransactions.push(
      <tr className={tempColor}>
        <td>{month + transaction.day}</td>
        <td>{transaction.desc}</td>
        <td>{displayNumber.toLocaleString("en-US")}</td>
        <td>{transaction.merchant}</td>
        <td>{transaction.category}</td>
        <td>
          <Button
            onClick={() => {
              toggleModal()
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
          <Modal
            isOpen={modal}
            fade={false}
            toggle={toggleModal}
            // <Modal
            // placement="top"
            // target="UncontrolledModalEditTransaction"
            // target="UncontrolledPopoverEditTransaction"
          >
            <ModalHeader toggle={toggleModal}>Edit Transaction</ModalHeader>
            {/* <PopoverHeader>Edit Transaction</PopoverHeader> */}
            <ModalBody>
              {/* <PopoverBody> */}
              <EditTransactionInfo
                token={props.token}
                view={props.view}
                month={props.month}
                accounts={props.accounts}
                categoryOptions = {categoryOptions}
              />
              <ModalFooter>
              <Button
                onClick={() => updateTransaction(transactionID)}
                color="success"
                type="submit"
              >
                {/* <Button onClick={updatingTransaction} color="success" type="submit"> */}
                Update
              </Button>
              {/* <Button
                // key={v4}
                onClick={cancelEditing}
                color="secondary"
              >
                Cancel
              </Button> */}
              <Button
                key={v4}
                onClick={() => deleteTransaction(transactionID)}
                color="danger"
              >
                {/* <Button onClick={deleteTransaction(id)} color="danger"> */}
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

  return (
    <div className="RecentTransactions">
      <Table overflow-y="scroll">
        <AddTransaction
          token={props.token}
          view={props.view}
          getTransaction={props.getTransaction}
          accounts = {props.accounts}
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

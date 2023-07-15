import React from "react";
import { Button } from "reactstrap";
import {
  BsFillEnvelopeCheckFill,
  BsFillEnvelopeExclamationFill,
} from "react-icons/bs";
import MarkUnpaid from "./MarkUnpaid";
export default function MarkPaid(props) {
  // console.log("markpaidprops",props)

  // let id;
  // let balance = 0;
  // let transObj;
  // let url;

  // const submitTrans = async (e) => {
  //   let tempBalance;
  //   // e.preventDefault();
  //   props.getAccounts();
  //   console.log("props",props)
  //   // console.log(finAccountRef.current.value)
  //   props.accounts.map((a) => {
  //     if (a.name === finAccountRef.current.value) {
  //       id = a._id
  //       balance = a.balance;
  //     }
  //   })
  //   if (transactionType === "expense") {
  //     tempBalance = balance - Number(amountRef.current.value);
  //   } else {tempBalance = balance + Number(amountRef.current.value);}

  //   if (tempBalance < 0) {
  //     alert(`This will overdraw ${finAccountRef.current.value}`)
  //     url = `http://localhost:4000/finAccount/edit/${id}`;
  //     url = `http://localhost:4000/finAccount/edit/${id}`;
  //   transObj = JSON.stringify({
  //     balance: tempBalance,
  //   })
  //   } else {
  //     url = `http://localhost:4000/finAccount/edit/${id}`;
  //     transObj = JSON.stringify({
  //       balance: tempBalance,
  //     })
  //   }

  //     let headers = new Headers();
  //     headers.append("Content-Type", "application/json");
  //     headers.append("Authorization", props.token);

  //     const reqOption = {
  //       headers: headers,
  //       body: transObj,
  //       method: "PATCH",
  //     };
  //     console.log("NewTransInforeqOption",reqOption)

  //     try {
  //       const res = await fetch(url, reqOption);
  //       const data = await res.json();
  //       // If the server provides a success message
  //       if (
  //         data.message === `${finAccountRef.current.value} account has been updated successfully`
  //       ) {
  //         props.getTransaction();
  //       } else {
  //         // Do nothing, maybe build an error component later to tell the user to re-configure their item
  //         console.error("User is unauthorized.");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  const submitNewTransaction = async () => {
    // const submitNewTransaction = async () => {
    // props.getTransaction()
    const url = "http://localhost:4000/transaction/add";
    // console.log("props.billInfo",props.billInfo)
    // console.log("props.token",props.token)
    // console.log(props.billInfo.amount)
    // console.log(props.billInfo.dueMonth)
    // console.log(props.billInfo.dueDay)
    // console.log(props.billInfo.category)
    // console.log(props.billInfo.title)
    // console.log(props.billInfo.title)
    // finAccount: "checking", //Change this to ask for an account
    // type: "expense",
    // console.log("base", props.billInfo.base)

    let amount = props.billInfo.amount;
    let month = props.billInfo.dueMonth;
    let day = props.billInfo.dueDay;
    let category = `${props.billInfo.category}`;
    let desc = props.billInfo.title;
    let merchant = props.billInfo.title;
    let finAccount = "checking"; //Change this to ask for an account
    let type = "expense";
    // let base = props.billInfo.base
    let base;

    //! This fixed the POST
    if (props.view === false) {
      base = "personal";
    } else {
      base = "household";
    }
    // console.log("I'm all about that base (mark paid):",props.billInfo.base)

    let acctObj = JSON.stringify({
      month: month,
      day: day,
      amount: amount,
      // day: (day = Number(day)),
      category: category,
      desc: desc,
      merchant: merchant,
      finAccount: finAccount, //Change this to ask for an account
      type: type,
      base: base,
    });

    let postHeaders = new Headers();
    // console.log("postheaders",postHeaders)
    postHeaders.append("Content-Type", "application/json");
    postHeaders.append("Authorization", props.token);
    // console.log("postheaders",postHeaders)

    const reqOption = {
      headers: postHeaders,
      body: acctObj,
      method: "POST",
    };
    console.log("markpaidprops", props);
    try {
      const res = await fetch(url, reqOption);
      const data = await res.json();
      // If the server provides a success message
      if (
        data.message === "You have created a new transaction!" ||
        data.message === "Your household has a new transaction!"
      ) {
        // submitTrans()
      } else {
        // Do nothing, maybe build an error component later to tell the user to re-configure their item
        console.error("User is unauthorized.");
      }
    } catch (err) {
      console.error(err);
    }
    props.getTransaction(); // Needed to update graph
    // props.getAccounts(); // Not needed to update graph // Also doesn't update transactions
    // props.getBudgets(); // Not needed to update graph // Also doesn't update transactions
    props.toggle();
  };

  // A hacky fix that works well enough for now.
  // https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
  function refreshPage() {
    window.location.reload(true);
  }

  async function payBill() {
    let value;
    if (props.value == true) {
      value = false;
    } else {
      value = true;
    }

    const url = `http://localhost:4000/bills/pay/${props.id}`;

    let paidBill = JSON.stringify({
      paid: value,
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    let requestOptions = {
      headers: headers,
      body: paidBill,
      method: "PATCH",
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      //* If we get the right response from the server
      if (data.message === "Bill has been updated successfully") {
        submitNewTransaction();
        // refreshPage();
        props.getBills();
        // props.toggle();
      }
    } catch (err) {
      console.error(err);
    }
  }

  // const updateTransactions = async () => {
  //   // console.log("view",props.view)
  //   let viewValue = props.view;
  //   let url;
  //   if (viewValue === true) {
  //     url = "http://localhost:4000/transaction/household";
  //   } else {
  //     url = "http://localhost:4000/transaction/mine";
  //   }
  //   // console.log("url",url)
  //   const reqOptions = {
  //     method: "GET",
  //     headers: new Headers({
  //       Authorization: props.token,
  //     }),
  //   };

  //   try {
  //     const res = await fetch(url, reqOptions);
  //     const data = await res.json();

  //     // If the server does not provide a failure message
  //     if (data.message !== "No transactions found.") {
  //       props.setTransaction(data.getAllTransactions);
  //     } else {
  //       props.setTransaction(null);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  if (props.value === true) {
    return (
      <MarkUnpaid
        token={props.token}
        getBills={props.getBills}
        id={props.billID}
        value={props.billInfo.paid}
        billInfo={props.billInfo} // Added
        toggle={props.toggle}
        view={props.view}
        getBudgets={props.getBudgets}
        getTransaction={props.getTransaction}
        getAccounts={props.getAccounts}
      />
    );
  } else {
    return (
      <Button color="success" onClick={payBill}>
        <BsFillEnvelopeCheckFill /> Mark Paid
      </Button>
    );
  }

  return <></>;
}

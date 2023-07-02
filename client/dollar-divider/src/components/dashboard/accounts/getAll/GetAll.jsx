import React from 'react'
import AccountsList from '../AccountsList';
import { useState, useEffect } from 'react';
export default function GetAll(props) {
  let name;
  let balance;
  let minBalance;
  let allocations;
  let available;
  let ownerID;
  let url;
  const [accounts, setAccounts] = useState([]);
  const getAccounts = async (viewValue) => {
    if (viewValue === true) {
      url = "http://localhost:4000/finAccount/household";
    } else {
      url = "http://localhost:4000/finAccount/mine";
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
      let information = data.getAllUserFinAccounts[0];
      // console.log("Accounts Data:",information)
      name = information.name;
      balance = information.balance;
      minBalance = information.balance;
      allocations = information.allocations;
      available = information.available;
      ownerID = information.ownerID;
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
    if (props.token) {
      getAccounts(props.view);
    }
  }, [props.token, props.view]);

  return (
    <>
    {/* <AccountsList 
            accounts = {accounts}
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
    </>
  )
}

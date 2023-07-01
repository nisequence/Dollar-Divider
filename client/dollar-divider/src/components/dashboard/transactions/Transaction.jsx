import {useEffect, useState} from 'react'
import RecentTransactions from './recentTransactions/RecentTransactions';
export default function Transaction(props) {
  // console.log(props)
    let url;
    const [transaction, setTransaction] = useState([]);
    const getTransaction = async (viewValue) => {
      if (viewValue === true) {
        url = "http://localhost:4000/transaction/household";
      } else {
        url = "http://localhost:4000/transaction/mine";
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
        if (data.message !== "No transactions found.") {
          setTransaction(data.getAllTrans);
        } else {
          setTransaction(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      if (props.token) {
        getTransaction(props.view);
      }
    }, [props.token, props.view]);
    // console.log("transaction:",transaction)
    // console.log("props", props)
    return (
      <>
        <RecentTransactions
            transactions = {props.transactions} token={props.token} view={props.view} getTransaction={getTransaction} />
            {/* transactions = {props.transactions} transaction={transaction} token={props.token} view={props.view} getTransaction={getTransaction} /> */}
    
      </>
    );
  }
  

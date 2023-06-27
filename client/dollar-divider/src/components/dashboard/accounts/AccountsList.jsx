import React, { useEffect, useState } from "react";
import {
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
} from "reactstrap";
export default function AccountsList(props) {
  let name;
  let balance;
  let minBalance;
  let allocations;
  let available;
  let ownerID;
  let url;
  name = "Fred's Bank"; //ToDO Replace w/fetched data
  balance = 1000;
  minBalance = 25;
  allocations = [1, 2, 3, 4, 5];
  available = 947;
  ownerID = "6494e9996b0e90fc6f6489a9";
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
      console.log("Accounts Data:",data)
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

  //todo  Gonna have to change this to account for what's coming in through the fetch.
let bank = [{"name": name, "balance": balance, "minBalance": minBalance, "allocations": allocations, "available": available, "ownerID": ownerID}]

let finAcct = bank.map((item) => {
  return (
  <Card>
    <CardBody>
      <CardTitle tag="h5">{item.name}</CardTitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6">
        ${item.balance}
      </CardSubtitle>
      {/* <Button>Update</Button> */}
    </CardBody>
  </Card>
)
})
return (
  <>
   <CardGroup>
  {finAcct}
  {finAcct}
  {finAcct}
</CardGroup>
<Button>Update</Button>
</>
)
}
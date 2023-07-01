import React, { useEffect, useState } from "react";
import {v4} from 'uuid';
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
let accounts = props.accounts;
// console.log("accounts",accounts);
let finAccts = accounts.map((acct) => {
    return (

      <Card key={v4()}>
      <CardBody>
        <CardTitle tag="h5">{acct.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          ${acct.balance.toLocaleString("en-US")}
        </CardSubtitle>
        {/* <Button>Update</Button> */}
      </CardBody>
    </Card>
    )
  })

  
  // [{"name": account.name, "balance": account.balance, "minBalance": account.minBalance, "allocations": account.allocations, "available": account.available, "ownerID": account.ownerID}]
return (
  <div className="accountsList">
   <CardGroup>
  {finAccts}
</CardGroup>
<Button>Update</Button>
</div>
)
}
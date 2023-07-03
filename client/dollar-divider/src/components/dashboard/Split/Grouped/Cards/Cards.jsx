import React from "react";
import { Card, CardBody, CardHeader, CardTitle, CardText } from "reactstrap";

export default function Cards(props) {
  let each = props.index;
  let owed = props.info[each].owes;
  let userID = props.info[each].userID;

  let filteredTransactions = props.transactions.filter((eachTransaction) => {
    return eachTransaction.ownerID === userID;
  });

  let contribution = 0;
  for (let i = 0; i < filteredTransactions?.length; i++) {
    contribution = contribution + filteredTransactions[i].amount;
  }
  let dollarContribution = contribution.toFixed(2);

  let remainder = (owed - dollarContribution).toFixed(2);

  return (
    <div key={each.id}>
      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "success",
          color: "black",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">{props.info[each].name}</CardTitle>
          <CardText>
            <p>Owes ${owed}</p>
            <p>Paid ${dollarContribution}</p>
            <p>
              <strong>Still owes ${remainder}</strong>
              <br />
              for this month
            </p>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

import React from "react";
import { Card, CardBody, CardHeader, CardTitle, CardText } from "reactstrap";

export default function Cards(props) {
  console.log(props);
  let each = props.index;
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
            <p>Owes ${props.info[each].owes}</p>
            <p>Paid ${props.info[each].contribution}</p>
            <p>
              <strong>Still owes ${props.info[each].remainder}</strong>
              <br />
              for this month
            </p>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

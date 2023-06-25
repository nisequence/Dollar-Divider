import React from "react";
import {
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
} from "reactstrap";

export default function AccountsList() {
  return (
    <>
      <br></br>
      <h4>My Accounts</h4>
      <h6>Fake Data</h6>
      <CardGroup>
        <Card>
          <CardBody>
            <CardTitle tag="h5">TD Bank Savings</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              $400
            </CardSubtitle>
            <Button>Update</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Community Bank Checking</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              $750
            </CardSubtitle>
            <Button>Update</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Mattress Money</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              $900
            </CardSubtitle>
            <Button>Update</Button>
          </CardBody>
        </Card>
      </CardGroup>
    </>
  );
}

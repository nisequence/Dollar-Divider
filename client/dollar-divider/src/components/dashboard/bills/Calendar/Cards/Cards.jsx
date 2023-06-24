import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardDeck,
  CardTitle,
  CardText,
  CardLink,
  Col,
  Row,
  Label,
  FormGroup,
  Input,
} from "reactstrap";

export default function Cards(props) {
  return (
    <>
      <Row sm="6">
        <Card
          body
          color="secondary"
          style={{
            maxHeight: "10vh",
            backgroundColor: "rgb(182,205,228)",
            margin: "0.75rem",
            padding: "0.2rem",
          }}
        >
          <CardBody>
            <Row>
              <Col>
                <CardTitle tag="h6">Title</CardTitle>
              </Col>
              <Col>
                <CardText>$</CardText>
              </Col>
              <Col>
                <CardText>Due</CardText>
              </Col>
              {/* <Col>
                <CardText>AutoPay?</CardText>
              </Col>
              <Col>
                <CardText>Recurring?</CardText>
              </Col> */}
              <Col>
                <CardText>Budget</CardText>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Row>
      {/* {displayBillCards(props.bills, props.month)} */}
      {props.bills.map((each) => {
        return (
          <>
            <Row sm="6">
              <Card
                body
                outline
                className="text-black"
                color="light"
                style={{
                  backgroundColor: "rgb(182,205,228)",
                  margin: "0.2rem",

                  padding: "0.2rem",
                }}
              >
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle tag="h6">{each.title}</CardTitle>
                    </Col>
                    <Col>
                      <CardText>${each.amount}</CardText>
                    </Col>
                    <Col>
                      <CardText>
                        {each.date} {each.day}
                      </CardText>
                    </Col>
                    {/* <Col>
                      <FormGroup check>
                        <Input
                          id="checkbox2"
                          type="checkbox"
                          defaultChecked={each.autoPay}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Input
                          id="checkbox2"
                          type="checkbox"
                          defaultChecked={each.recurring}
                        ></Input>
                      </FormGroup>
                    </Col> */}
                    <Col>
                      <CardText>{each.category}</CardText>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Row>
          </>
        );
      })}
    </>
  );
}

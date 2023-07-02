import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardDeck,
  CardTitle,
  CardText,
  Col,
  Row,
} from "reactstrap";
import OpenCard from "./OpenCard/OpenCard";
import MemberView from "./OpenCard/MemberView";

export default function Cards(props) {
  let url;
  const [budgets, setBudgets] = useState([]);
  const getBudgets = async (viewValue) => {
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
      if (data.message == "Budget(s) found!") {
        setBudgets(data.allBudgets);
      } else {
        setBudgets(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      getBudgets();
    }
  }, [props.token, props.view]);

  let cardColor;
  function modifyColor(value) {
    if (value === true) {
      //* This is the color for paid bills (not a fan of it currently but good enough)
      cardColor = "rgb(0, 100, 0)";
    } else {
      //* This is the color for unpaid bills (would like to keep this)
      cardColor = "rgb(182,205,228)";
    }
  }

  const status = localStorage.getItem("Status");

  let canEdit;
  if (status == "Admin" || props.view === false) {
    canEdit = true;
  } else {
    canEdit = false;
  }

  return (
    <>
      <Row sm="5" overflow-y="scroll">
        <Card
          body
          style={{
            maxHeight: "10vh",
            backgroundColor: "rgba(0, 57, 122, 0.932)",
            margin: "0.75rem",
            padding: "0.2rem",
            color: "white",
            alignContent: "center",
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
              <Col>
                <CardText>Budget</CardText>
              </Col>
              <Col>
                <CardText>More</CardText>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Row>
      {/* {displayBillCards(props.bills, props.month)} */}
      {props.bills?.map((each) => {
        //* Set different value for background color based on whether the bill is paid or unpaid
        modifyColor(each.paid);
        /* ! Would like to nest the below return for each bill into a scroll bar container */
        return (
          <div key={props.bills.indexOf(each)}>
            <Row sm="5">
              <Card
                body
                outline
                className="text-black"
                color="light"
                style={{
                  backgroundColor: cardColor,
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
                      <CardText>
                        ${each.amount.toLocaleString("en-US")}
                      </CardText>
                    </Col>
                    <Col>
                      <CardText>
                        {each.dueMonth} {each.dueDay}
                      </CardText>
                    </Col>
                    <Col>
                      <CardText>{each.category}</CardText>
                    </Col>
                    <Col>
                      {canEdit ? (
                        <OpenCard
                          billInfo={each}
                          token={props.token}
                          getBills={props.getBills}
                          budgets={budgets}
                          view={props.view}
                        />
                      ) : (
                        <MemberView
                          billInfo={each}
                          token={props.token}
                          getBills={props.getBills}
                          budgets={budgets}
                          view={props.view}
                        />
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Row>
          </div>
        );
      })}
    </>
  );
}

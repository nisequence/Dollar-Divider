import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Tooltip,
} from "reactstrap";
import { LuCalendarPlus, LuCalendarMinus } from "react-icons/lu";
import Cards from "./Cards/Cards";
import AddBill from "../AddBill/AddBill";

const monthGroup = [
  {
    id: 1,
    month: "June",
  },
  {
    id: 2,
    month: "July",
  },
  {
    id: 3,
    month: "August",
  },
];

export default function Calendar(props) {
  const [prevTooltipOpen, setPrevTooltipOpen] = useState(false);
  const togglePrev = () => setPrevTooltipOpen(!prevTooltipOpen);
  const [nextTooltipOpen, setNextTooltipOpen] = useState(false);
  const toggleNext = () => setNextTooltipOpen(!nextTooltipOpen);

  const status = sessionStorage.getItem("Status");

  const [activeIndex, setActiveIndex] = useState(1);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === monthGroup.length - 1 ? activeIndex : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? activeIndex : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const viewType = () => {
    if (props.view === false || status === "Admin") {
      //* If viewing personal or if user is the Admin
      // get all the stuff
      return (
        <>
          <Col>
            <h4 margin="0" padding="0">
              Bills At-A-Glance
            </h4>
            <AddBill
              getBills={props.getBills}
              token={props.token}
              month={monthGroup[activeIndex]}
              view={props.view}
            />
          </Col>
          <Col style={{ maxWidth: "13vw" }}>

          </Col>
        </>
      );
    } else {
      //* If viewing household and not the admin
      // get minimal
      return (
        <>
          <Col>
            <h4 margin="0" padding="0">
              Bills At-A-Glance
            </h4>
          </Col>
          <Col style={{ maxWidth: "13vw"}}></Col>
        </>
      );
    }
  };

  const slides = monthGroup.map((monthName) => {
    let monthlyBills = props.bills?.filter((bills) => {
      let remainingBills = bills.dueMonth === monthName.month;
      return remainingBills;
    });
    return (
      <CarouselItem
        className="overflow-calendar"
        id="billsCalendar"
        tag="div"
        key={monthName.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        /*         style={{ maxWidth: "95vw", maxHeight: "75vh" }}
         */
        slide={false}
      >
        <Cards
          getBills={props.getBills}
          bills={monthlyBills}
          month={monthName}
          view={props.view}
          token={props.token}
        />
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {`.overflow-calendar {
          height: 52.5vh;
          overflow-y:scroll;
          overflow-x: hidden;
  scrollbar-width: thin;
        }`}
      </style>
      {/* <div id="idhere">
      </div> */}
      <Row style={{ maxHeight: "6vh" }}>
        <Col style={{ maxWidth: "13vw" }}></Col>
        {viewType()}
      </Row>
      <Row id="budgetCalendar" style={{ maxHeight: "5vh" }}>
        <Col>
          <Button
            className="button"
            onClick={previous}
            id="Prev"
            style={{ marginTop: "0vh" }}
          >
            <LuCalendarMinus />
          </Button>
          <Tooltip isOpen={prevTooltipOpen} target="Prev" toggle={togglePrev}>
            Back
          </Tooltip>
        </Col>
        <Col>
          <h3>
            <b>{monthGroup[activeIndex].month}</b>
          </h3>
        </Col>
        <Col>
          <Button
            className="button"
            onClick={next}
            id="Next"
            style={{ marginTop: "0vh" }}
          >
            <LuCalendarPlus />
          </Button>
          <Tooltip isOpen={nextTooltipOpen} target="Next" toggle={toggleNext}>
            Next
          </Tooltip>
        </Col>
      </Row>
      <Carousel
        interval={null}
        activeIndex={activeIndex}
        data-bs-interval="false"
        next={next}
        previous={previous}
      >
        <Card
          body
          style={{
            maxHeight: "10vh",
            backgroundColor: "#00517c",
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
                <CardText tag="h6">$</CardText>
              </Col>
              <Col>
                <CardText tag="h6">Due</CardText>
              </Col>
              <Col>
                <CardText tag="h6">Budget</CardText>
              </Col>
              <Col>
                <CardText tag="h6">More</CardText>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {slides}
      </Carousel>
    </div>
  );
}

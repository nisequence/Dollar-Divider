import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
  Button,
  Row,
  Col,
} from "reactstrap";
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
  const status = localStorage.getItem("Status");

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
    if (props.view === false || status == "Admin") {
      //* If viewing personal or if user is the Admin
      // get all the stuff
      return (
        <>
          <Col>
            <h4 margin="0" padding="0">
              Bills At-A-Glance
            </h4>
          </Col>
          <Col style={{ maxWidth: "13vw" }}>
            <AddBill
              getBills={props.getBills}
              token={props.token}
              month={monthGroup[activeIndex]}
              view={props.view}
            />
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
          <Col style={{ maxWidth: "13vw" }}></Col>
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
        tag="div"
        key={monthName.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        /*         style={{ maxWidth: "95vw", maxHeight: "75vh" }}
         */ //! The below key/value is supposed to stop the carousel from moving on its own, but it is not working
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
          height: 60vh;
          overflow-y:scroll;
          overflow-x: hidden;
          scrollbar-color: "red orange";
  scrollbar-width: thin;
        }`}
      </style>
      <Row style={{ maxHeight: "6vh" }}>
        <Col style={{ maxWidth: "13vw" }}></Col>
        {viewType()}
      </Row>
      <Row style={{ maxHeight: "6vh" }}>
        <Col>
          <Button
            className="button"
            onClick={previous}
            id="Prev"
            style={{ marginTop: "0vh" }}
          >
            Prev
          </Button>
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
            Next
          </Button>
        </Col>
      </Row>
      <Carousel
        interval={null}
        activeIndex={activeIndex}
        data-bs-interval="false"
        next={next}
        previous={previous}
      >
        {slides}
      </Carousel>
    </div>
  );
}

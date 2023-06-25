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

  const slides = monthGroup.map((monthName) => {
    let monthlyBills = props.bills?.filter((bills) => {
      let remainingBills = bills.dueMonth === monthName.month;
      return remainingBills;
    });
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={monthName.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        //! The below key/value is supposed to stop the carousel from moving on its own, but it is not working
        slide={false}
      >
        <Cards bills={monthlyBills} month={monthName} />
        <CarouselCaption className="text-black" />
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {`.custom-tag {
          max-width: 100%;
          height: 400px;
        }`}
      </style>
      <Row style={{ maxHeight: "6vh" }}>
        <Col style={{ maxWidth: "13vw" }}></Col>
        <Col>
          <h4 margin="0" padding="0">
            Bills At-A-Glance
          </h4>
        </Col>
        <Col style={{ maxWidth: "13vw" }}>
          <AddBill
            token={props.token}
            month={monthGroup[activeIndex]}
            view={props.view}
          />
        </Col>
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
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        //! The below key/value is supposed to stop the carousel from moving on its own, but it is not working
        slide={false}
      >
        {slides}
        {/* //! Removed white arrows that controlled carousel below */}
        {/* <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        /> */}
      </Carousel>
    </div>
  );
}

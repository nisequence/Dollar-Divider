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

const months = [
  {
    id: 1,
    month: "May",
  },
  {
    id: 2,
    month: "June",
  },
  {
    id: 3,
    month: "July",
  },
];

const items = [
  {
    title: "Rent",
    amount: 1000,
    date: "June",
    day: "1",
    autoPay: true,
    recurring: true,
    category: "Rent",
  },
  {
    title: "Car Payment",
    amount: 200,
    date: "June",
    day: "2",
    autoPay: false,
    recurring: true,
    category: "Transportation",
  },
  {
    title: "Rent",
    amount: 1000,
    date: "July",
    day: "12",
    autoPay: true,
    recurring: true,
    category: "Rent",
  },
  {
    title: "Rent",
    amount: 1000,
    date: "May",
    day: "5",
    autoPay: true,
    recurring: true,
    category: "Rent",
  },
  {
    title: "Groceries",
    amount: 250,
    date: "May",
    day: "15",
    autoPay: false,
    recurring: false,
    category: "Food",
  },
  {
    title: "Marshall's CC",
    amount: 35,
    date: "June",
    day: "16",
    autoPay: true,
    recurring: true,
    category: "Credit",
  },
  {
    title: "Marshall's CC",
    amount: 35,
    date: "July",
    day: "15",
    autoPay: true,
    recurring: false,
    category: "Credit",
  },
];

export default function Calendar(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === months.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? months.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = months.map((monthGroup) => {
    let monthlyBills = items.filter((bills) => {
      let remainingBills = bills.date === monthGroup.month;
      return remainingBills;
    });
    // console.log("Logging monthlyBills:", monthlyBills);
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={monthGroup.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        slide={false}
      >
        <Cards bills={monthlyBills} month={monthGroup} />
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
      <Row>
        <h4 margin="0" padding="0">
          Bills At-A-Glance
        </h4>
      </Row>
      <Row>
        <Col>
          <Button className="button" onClick={previous} id="Prev">
            Prev
          </Button>
        </Col>
        <Col>
          <Button className="button" onClick={next} id="Next">
            Next
          </Button>
        </Col>
      </Row>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        slide={false}
      >
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
}

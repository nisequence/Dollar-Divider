import React, { useEffect, useState } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import Cards from "./Cards/Cards";

export default function Grouped(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === props.cardInfo?.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? props.cardInfo?.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  //   const items = [
  //     {
  //       id: 1,
  //       altText: "Slide 1",
  //       caption: "Slide 1",
  //     },
  //     {
  //       id: 2,
  //       altText: "Slide 2",
  //       caption: "Slide 2",
  //     },
  //     {
  //       id: 3,
  //       altText: "Slide 3",
  //       caption: "Slide 3",
  //     },
  //   ];

  const slides = props.cardInfo?.map((each) => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={each.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <Cards
          token={props.token}
          view={props.view}
          index={props.cardInfo.indexOf(each)}
          info={props.cardInfo}
          transactions={props.transactions}
        />
      </CarouselItem>
    );
  });

  useEffect(() => {
    if (props.token) {
      console.log("I should get new cards");
    }
  }, [props.token, props.cardInfo]);

  return (
    <>
      <style>
        {`.custom-tag {
              max-width: 100vw;
              height: 200px;
            }`}
      </style>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
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
    </>
  );
}

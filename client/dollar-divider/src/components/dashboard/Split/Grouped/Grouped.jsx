import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";
import Cards from "./Cards/Cards";

export default function Grouped(props) {
  //   const total = localStorage.getItem("Total");
  //   const newTotal = Number(total);
  //   // console.log(newTotal); // coming in as a number now

  //   const users = localStorage.getItem("Users");
  //   const userArray = users.split(",");
  //   //   console.log(userArray);
  //   const percents = localStorage.getItem("Percents");
  //   const percentArray = percents.split(",");
  //   //   console.log(percentArray);
  //   //!  console.log(typeof users); // both coming in as a string
  //   //! need to separate into arrays

  //   const [cardInfo, setCardInfo] = useState(userArray);
  //   const allUserInfo = () => {
  //     let populate = [];
  //     for (let u = 0; u < userArray?.length; u++) {
  //       let percentNum = Number(percentArray[u]);
  //       let owed = (percentNum * newTotal) / 100;
  //       let paid = 0;
  //       populate.push({
  //         id: u,
  //         name: userArray[u],
  //         owes: owed.toFixed(2),
  //         contribution: paid.toFixed(2),
  //         remainder: (owed - paid).toFixed(2),
  //       });
  //       console.log("In func", populate);
  //     }
  //     console.log(populate);
  //     return populate;
  //   };
  //   useEffect(() => {
  //     if (props.token) {
  //       populateCards();
  //       console.log(cardInfo);
  //     }
  //   }, [props.token, props.view]);

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
        />
      </CarouselItem>
    );
  });

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

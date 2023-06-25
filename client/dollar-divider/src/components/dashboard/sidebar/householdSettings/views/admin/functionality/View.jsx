import React from "react";
import { useState, useEffect } from "react";
import {
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap";

export default function View({ token }) {
  const [householdInfo, setHouseholdInfo] = useState([]);

  const getHousehold = async () => {
    let url = "http://localhost:4000/household/admin";

    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      console.log(data.getHousehold);

      if (data.message === "Household was found!") {
        setHouseholdInfo(data.getHousehold);
        console.log(householdInfo);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      getHousehold();
    }
  }, [token]);

  const listNames = householdInfo.participantNames?.map((name) => {
    return <li>{name}</li>;
  });

  const listIDs = householdInfo.participantIDs?.map((id) => {
    return <li>{id}</li>;
  });

  const listPercents = householdInfo.participantPercents?.map((percent) => {
    return <li>{percent}</li>;
  });

  return (
    <>
      <br></br>
      <h3>
        <u>{householdInfo.name}</u>
      </h3>
      <p>
        <i>Current User Limit: {householdInfo.participantMaxNum}</i>
      </p>
      <UncontrolledAccordion defaultOpen="1">
        <AccordionItem>
          <AccordionHeader targetId="1">Household Members</AccordionHeader>
          <AccordionBody accordionId="1">
            <ul>{listNames}</ul>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Household IDs</AccordionHeader>
          <AccordionBody accordionId="2">
            <ul>{listIDs}</ul>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3">Percentage Breakdowns</AccordionHeader>
          <AccordionBody accordionId="3">
            <ul>{listPercents}</ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </>
  );
}

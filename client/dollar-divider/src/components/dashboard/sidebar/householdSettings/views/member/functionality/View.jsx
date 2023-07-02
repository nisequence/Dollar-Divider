import React from "react";
import { useState, useEffect } from "react";
import {
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Table,
  Row,
  Col,
} from "reactstrap";
import Leave from "./Leave";

export default function View({ token }) {
  const [memberInfo, setMemberInfo] = useState([]);

  const getHousehold = async () => {
    let url = "http://localhost:4000/household/member";

    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // console.log(data);

      if (data.message === "Household was found!") {
        setMemberInfo(data);
        // console.log(memberInfo);
        // console.log("working!");
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

  const tableNames = memberInfo.participantNames?.map((name) => {
    let index = memberInfo.participantNames.indexOf(name);
    return (
      <tr key={index}>
        <td>{name}</td>
        <td>{memberInfo.participantPercents[index]}</td>
      </tr>
    );
  });

  return (
    <>
      <br></br>
      <Row>
        <Col></Col>
        <Col>
          <h3>
            <u>{memberInfo.name}</u>
          </h3>
        </Col>
        <Col>
          <Leave getHousehold={getHousehold} token={token} />
        </Col>
      </Row>
      <br></br>
      <UncontrolledAccordion defaultOpen="1">
        <AccordionItem>
          <AccordionHeader targetId="1">Household Members</AccordionHeader>
          <AccordionBody accordionId="1">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contribution %</th>
                </tr>
              </thead>
              <tbody>{tableNames}</tbody>
            </Table>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </>
  );
}

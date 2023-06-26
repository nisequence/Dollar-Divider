import React from "react";
import { useState, useEffect } from "react";
import {
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Table,
} from "reactstrap";

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

  const listNames = memberInfo.participantNames?.map((name) => {
    return <li>{name}</li>;
  });

  const tableNames = memberInfo.participantNames?.map((name) => {
    let index = memberInfo.participantNames.indexOf(name);
    return (
      <>
        <tr>
          <td>{name}</td>
          <td>{memberInfo.participantPercents[index]}</td>
        </tr>
      </>
    );
  });

  return (
    <>
      <br></br>
      <h3>
        <u>{memberInfo.name}</u>
      </h3>
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

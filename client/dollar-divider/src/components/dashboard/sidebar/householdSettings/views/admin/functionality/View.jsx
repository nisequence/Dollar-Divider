import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Button,
  Input,
  Table,
} from "reactstrap";
import Ban from "./Ban";
import Tweak from "./Tweak";

export default function View(props) {
  const [householdInfo, setHouseholdInfo] = useState([]);
  const [editPercent, setEditPercent] = useState(false);
  const numberRef = useRef();

  const getHousehold = async () => {
    let url = "http://localhost:4000/household/admin";

    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // console.log(data.getHousehold);

      if (data.message === "Household was found!") {
        setHouseholdInfo(data.getHousehold);
        // console.log(householdInfo);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      getHousehold();
    }
  }, [props.token]);

  const tableNames = householdInfo.participantNames?.map((name) => {
    return (
      <>
        <tr>
          <td>{name}</td>
          <td>
            {
              householdInfo.participantPercents[
                householdInfo.participantNames.indexOf(name)
              ]
            }
          </td>
          <td>
            <Ban
              getHousehold={getHousehold}
              token={props.token}
              userID={
                householdInfo.participantIDs[
                  householdInfo.participantNames.indexOf(name)
                ]
              }
            ></Ban>
          </td>
        </tr>
      </>
    );
  });

  const tablePercents = householdInfo.participantNames?.map((name) => {
    let contribution =
      householdInfo.participantPercents[
        householdInfo.participantNames.indexOf(name)
      ];
    let index = householdInfo.participantNames.indexOf(name);
    return (
      <>
        <tr>
          <td>{name}</td>
          <td>
            {editPercent ? (
              <Input
                innerRef={numberRef}
                type="number"
                id={index}
                className="percentageInput"
                style={{ maxWidth: "10vw" }}
                placeholder={contribution}
              ></Input>
            ) : (
              contribution
            )}
          </td>
        </tr>
      </>
    );
  });

  const inviteCode = householdInfo._id;
  // const inviteLink = `http://localhost:4000/household/join/${inviteCode}`;

  return (
    <>
      <br></br>
      <h3>
        <u>{householdInfo.name}</u>
      </h3>
      <p>
        <i>Current User Limit: {householdInfo.participantMaxNum}</i>
      </p>
      <Button
        color="success"
        onClick={() => {
          navigator.clipboard.writeText(inviteCode);
        }}
      >
        Copy Household Invite Code
      </Button>
      <br></br>
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
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>{tableNames}</tbody>
            </Table>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Adjust Contributions</AccordionHeader>
          <AccordionBody accordionId="2">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contribution %</th>
                </tr>
              </thead>
              <tbody>{tablePercents}</tbody>
            </Table>
            <Button
              color="warning"
              onClick={() => setEditPercent(!editPercent)}
            >
              Change
            </Button>
            <Tweak
              info={householdInfo}
              token={props.token}
              getHousehold={getHousehold}
            />
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </>
  );
}

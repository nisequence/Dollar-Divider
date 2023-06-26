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
  Col,
  Row,
} from "reactstrap";
import Edit from "./Edit";
import Ban from "./Ban";
import Tweak from "./Tweak";
import Delete from "./Delete";

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
                className="percentageInput"
                style={{ maxWidth: "8vw", margin: "auto" }}
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
      <Row>
        <Col>
          <p>
            <strong>Ask someone to join!</strong>
          </p>
          <Button
            style={{ margin: "auto" }}
            color="info"
            onClick={() => {
              navigator.clipboard.writeText(inviteCode);
            }}
          >
            Copy Household Token
          </Button>
        </Col>
        <Col>
          <h3>
            <u>{householdInfo.name}</u>
          </h3>
          <p>
            <i>Current User Limit: {householdInfo.participantMaxNum}</i>
          </p>
          <Edit
            householdInfo={householdInfo}
            token={props.token}
            getHousehold={getHousehold}
          />
        </Col>
        <Col>
          <p>
            <strong>Careful, this is forever!</strong>
          </p>
          <Delete token={props.token} />
        </Col>
      </Row>
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
              edit={setEditPercent}
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

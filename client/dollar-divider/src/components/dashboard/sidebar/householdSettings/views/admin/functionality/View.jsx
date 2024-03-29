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
  Alert,
} from "reactstrap";
import { AiFillCopy } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import Edit from "./Edit";
import Ban from "./Ban";
import Tweak from "./Tweak";
import Delete from "./Delete";

export default function View(props) {
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(!visible);

  const [householdInfo, setHouseholdInfo] = useState([]);
  const updateInfo = (newInfo) => {
    sessionStorage.setItem("Percents", newInfo.participantPercents);
    sessionStorage.setItem("Users", newInfo.participantNames);
    sessionStorage.setItem("IDs", newInfo.participantIDs);
    // ^ .setItem(key, value)
    setHouseholdInfo(newInfo);
  };
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
        updateInfo(data.getHousehold);
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
    if (householdInfo.participantNames[0] === name) {
      return (
        <tr key={householdInfo.participantNames.indexOf(name)}>
          <td>{name}</td>
          <td>
            {
              householdInfo.participantPercents[
                householdInfo.participantNames.indexOf(name)
              ]
            }
          </td>
          <td></td>
        </tr>
      );
    } else {
      return (
        <tr key={householdInfo.participantNames.indexOf(name)}>
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
      );
    }
  });

  const tablePercents = householdInfo.participantNames?.map((name) => {
    let index = householdInfo.participantNames.indexOf(name);
    let contribution = householdInfo.participantPercents[index];
    return (
      <tr key={index}>
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
    );
  });

  const inviteCode = householdInfo._id;
  // const inviteLink = `http://localhost:4000/household/join/${inviteCode}`;

  return (
    <>
      <hr />
      <Row>
        <Col>
          <p>
            <strong>Ask roommates to join!</strong>
          </p>
          <Button
            style={{ margin: "auto" }}
            color="info"
            onClick={() => {
              navigator.clipboard.writeText(inviteCode);
              onDismiss();
            }}
          >
            <AiFillCopy /> Invite Code
          </Button>
          <br />
          <br />
          <Alert
            id="copyAlert"
            color="info"
            isOpen={visible}
            toggle={onDismiss}
          >
            Code copied!
          </Alert>
        </Col>
        <Col>
          <h5>
            <u>{householdInfo.name}</u>
          </h5>
          <p>
            <i>Current User Limit: {householdInfo.participantMaxNum}</i>
          </p>
          <Edit
            householdInfo={householdInfo}
            token={props.token}
            getHousehold={getHousehold}
          />
          <br />
        </Col>
        <Col>
          <p>
            <strong>Careful, this is forever!</strong>
          </p>
          <Delete token={props.token} />
        </Col>
      </Row>
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
              <GrEdit />
            </Button>
            <Tweak
              editStatus={editPercent}
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

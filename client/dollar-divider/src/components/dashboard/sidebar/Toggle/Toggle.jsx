import React from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { BiSolidUser } from "react-icons/bi";
import { BsHouseFill } from "react-icons/bs";

function Example({ setView, view }) {
  return (
    <>
      <Form>
        <Row>
          <Col>
            <Label>
              <BiSolidUser />
            </Label>
          </Col>
          <Col>
            <FormGroup switch>
              <Input
                type="switch"
                checked={view}
                onChange={() => {
                  setView(!view);
                }}
              />
            </FormGroup>
          </Col>
          <Col>
            <Label>
              <BsHouseFill />
            </Label>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Example;

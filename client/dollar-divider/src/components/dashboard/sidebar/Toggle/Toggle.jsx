import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

function Example({ setView, view }) {
  return (
    <Form>
      <FormGroup switch>
        <Input
          type="switch"
          checked={view}
          onClick={() => {
            setView(!view);
          }}
        />
        <Label check>Household View</Label>
      </FormGroup>
    </Form>
  );
}

export default Example;

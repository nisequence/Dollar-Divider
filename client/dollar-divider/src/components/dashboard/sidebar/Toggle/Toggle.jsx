import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

function Example(props) {
  const [state, setState] = useState(true);

  return (
    <Form>
      <FormGroup switch>
        <Input
          type="switch"
          checked={!state}
          onClick={() => {
            setState(!state);
          }}
        />
        <Label check>Household View</Label>
      </FormGroup>
    </Form>
  );
}

export default Example;

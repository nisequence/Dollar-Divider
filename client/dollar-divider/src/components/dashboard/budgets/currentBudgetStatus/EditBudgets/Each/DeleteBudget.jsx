import React from "react";
import { Button } from "reactstrap";

export default function DeleteBudget(props) {
  //* DELETE FUNCTION
  async function deleteBudget() {
    const url = `http://localhost:4000/budget/delete/${props.budgetID}`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (data.message == "Budget was successfully deleted!") {
        props.getBudgets();
        props.toggle();
      } else {
        console.error("Access to or existence of this budget was not located");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Button color="danger" onClick={deleteBudget}>
        <>DeleteBudget</>
      </Button>
    </>
  );
}

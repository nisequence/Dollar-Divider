import React from "react";
import { Button } from "reactstrap";

export default function DeleteBudget(props) {
  //* DELETE FUNCTION
  async function deleteBudget() {
    const url = `http://localhost:4000/budget/delete/${props.budgetID}`;
    console.log(props.BudgetID);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();

      if (data) {
        props.fetchBudgets();
        // navigate("/dashboard")
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

import React from "react";

export default function DeleteBudget(props) {
  //* DELETE FUNCTION
  async function deleteBudget() {
    const url = `http://localhost:4000/budgets/${props.id}`;

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
      {" "}
      <h1>DeleteBudget</h1>
    </>
  );
}

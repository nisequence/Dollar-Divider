import React from "react";
import { Button } from "reactstrap";

export default function DeleteTransaction(props) {
  async function deleteTransaction() {
    let url = `http://localhost:4000/transaction/delete/${props.id}`;
    console.log("id", props.id);
    // alert(deleteURL: ${url});
    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };

    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      if (data.message === "Transaction was successfully deleted!") {
        // props.getTransaction();
        // alert("deleted")
        // refreshPage()
      }
    } catch (error) {
      console.error(error);
    }
    props.getTransaction();
  }
  function refreshPage() {
    window.location.reload(true);
  }

  return (
    <>
      <Button color="danger" onClick={deleteTransaction}>
        Delete
        {/* {/ <BsFillEnvelopeSlashFill /> Delete */}
      </Button>
    </>
  );
}

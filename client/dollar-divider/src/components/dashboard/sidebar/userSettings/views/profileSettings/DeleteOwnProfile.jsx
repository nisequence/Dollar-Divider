import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
export default function DeleteOwnProfile(props) {
  const navigate = useNavigate();
  function deleteProfileConfirmation() {
    // https://stackoverflow.com/questions/9334636/how-to-create-a-dialog-with-ok-and-cancel-options
    // https://stackoverflow.com/questions/63311845/unexpected-use-of-confirm-no-restricted-globals
    if (
      window.confirm(
        "\n\n             Deleting your profile is permanent\n                             Are you Sure?"
      )
    ) {
      deleteProfile();
    }
    // else {
    //   alert("Deletion Cancelled")
    // }
  }
  const deleteProfile = async () => {
    let url = "http://localhost:4000/user/quit";

    const reqOptions = {
      method: "DELETE",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // If the server does not provide a failure message
      if (
        data.message ===
        "User was successfully removed from the household and deleted!"
      ) {
        // console.log("User Deleted, logging out.");
        localStorage.removeItem("token"); // clears out local storage
        localStorage.clear();
        sessionStorage.clear();
        props.updateToken(""); // resets our state to an empty string
        navigate("/"); // routes us back to Auth
      } else {
        console.error("Unable to delete user!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <br />
      <Button className="bg-danger" onClick={deleteProfileConfirmation}>
        <MdDeleteForever /> Delete Profile
      </Button>
    </>
  );
}

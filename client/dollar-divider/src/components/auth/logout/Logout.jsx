import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Logout({ setToken }) {
  const navigate = useNavigate();

  // Build a sign-out function
  const logout = () => {
    localStorage.removeItem("token"); // clears out local storage
    setToken(""); // resets our state to an empty string
    navigate("/"); // routes us back to Auth
  };

  return (
    <>
      <Button onClick={logout} color="danger">
        Logout
      </Button>
    </>
  );
}

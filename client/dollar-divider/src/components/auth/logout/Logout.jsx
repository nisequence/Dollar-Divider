import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

export default function Logout({ updateToken }) {
  const navigate = useNavigate();

  // Build a sign-out function
  const logout = () => {
    localStorage.removeItem("token"); // clears out local storage
    localStorage.clear();
    sessionStorage.clear();
    updateToken(""); // resets our state to an empty string
    navigate("/"); // routes us back to Auth
  };

  return (
    <>
      <Button id="logout" onClick={logout} color="danger">
        <CiLogout /> Logout
      </Button>
    </>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import Admin from "./views/admin/Admin";
import Member from "./views/member/Member";
import Solo from "./views/solo/Solo";
export default function HouseholdSettings() {
  const token = localStorage.getItem("token");

  const [userStatus, setUserStatus] = useState("Member");
  const updateStatus = (newStatus) => {
    localStorage.setItem("Status", newStatus);
    setUserStatus(newStatus);
  };

  const getStatus = async () => {
    let url = "http://localhost:4000/household/role";

    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // If the server does not provide a failure message
      if (data.message === "Admin") {
        updateStatus(data.message);
      } else if (data.message === "Member") {
        updateStatus(data.message);
      } else if (data.message === "Solo") {
        updateStatus(data.message);
      } else {
        console.error("Unable to identify user type!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      getStatus();
    }
  }, [token, userStatus]);

  const returnView = () => {
    if (userStatus === "Admin") {
      return <Admin token={token} />;
    } else if (userStatus === "Member") {
      return <Member token={token} />;
    } else if (userStatus === "Solo") {
      return <Solo token={token} />;
    }
  };
  return (
    <div id="rightSideMenu">
      <br></br>
      <h3>Household Settings</h3>
      {returnView()}
    </div>
  );
}

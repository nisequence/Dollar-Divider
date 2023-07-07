import React from "react";
import { useState, useEffect } from "react";
import ProfileSettings from "./views/profileSettings/ProfileSettings";
import DeleteOwnProfile from "./views/profileSettings/DeleteOwnProfile";
export default function UserSettings(props) {
  const token = localStorage.getItem("token");

  const [userStatus, setUserStatus] = useState("Member");
  const updateStatus = (newStatus) => {
    sessionStorage.setItem("Status", newStatus);
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

      // console.log(data);

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

  return (
    <div id="userSettingsMenu">
      <br />
      <h3>User Settings</h3>
      <ProfileSettings />
      <DeleteOwnProfile 
      updateToken={props.updateToken}
        token = {props.token}

      />
    </div>
  );
}

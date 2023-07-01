import React, { useState, useEffect } from "react";

export default function Greet() {
  const token = localStorage.getItem("token");
  const nameItem = localStorage.getItem("Name");

  const [name, setName] = useState(nameItem);
  const updateName = (newName) => {
    localStorage.setItem("Name", newName);
    setName(newName);
  };

  const getName = async () => {
    let url = "http://localhost:4000/user/find";

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
      if (data.message === "Found!") {
        updateName(data.findUser.firstName);
        console.log(name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      getName();
    }
  }, [token, nameItem]);

  return (
    <>
      <h6>Welcome, {name}!</h6>
    </>
  );
}

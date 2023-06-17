// import React, { useRef } from "react";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
// import { Form, FormGroup, Input, Label, Button } from "reactstrap";
ChartJS.register(ArcElement, Tooltip, Legend);

export const chartData = {
  labels: ["Netflix", "Car", "Phone"],
  datasets: [
    {
      label: "label here",
      data: [1, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
    },
  ],
};

export default function CurrentBudgetStatus(props) {
  const { id } = useParams();

  // Headers
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // setting our content to be passed
  myHeaders.append("Authorization", props.token);
  // token to evaluate.

  // Build our handleSubmit function
  // const handleSubmit = async (e) => {
  // e.preventDefault();

  const fetchBudgetInfo = async (props) => {
    let url = `mongodb+srv://dollardivider:xCE0j5V6WGWwM23n@cluster0.bsjweol.mongodb.net/${id}`;
    const requestOption = {
      method: "GET",
      headers: myHeaders,
      body: bodyObj,
    }; // packaging up all our options in an object
    // Build the try/catch with our fetch
    try {
      const res = await fetch(url, requestOption);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    props.fetchBudgetInfo();
    // };
  };
  // Build url variable

  // Construct the body object & JSON stringify it
  let bodyObj = JSON.stringify({}); // JSON-ifying our data to be passed.
  // console.log("bodyObj: ",bodyObj);

  // Request Options object

  return (
    <>
      <div className="CurrentBudgetStatus">
        Monthly Budget
        <Pie
          data={chartData}
          onElementsClick={(elems) => {
            // if required to build the URL, you can
            // get datasetIndex and value index from an `elem`:
            // console.log(elems[0]._datasetIndex + ", " + elems[0]._index);
            console.log("click");
            // and then redirect to the target page:
            window.location = "https://example.com";
          }}
        />
      </div>
    </>
  );
}

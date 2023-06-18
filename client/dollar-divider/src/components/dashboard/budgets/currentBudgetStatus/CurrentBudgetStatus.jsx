// import React, { useRef } from "react";
import React, {useState} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from "reactstrap";
import { useParams } from "react-router-dom";
import ModalFullscreenExample from "../../../../utils/modalExample";
// import { Form, FormGroup, Input, Label, Button } from "reactstrap";
ChartJS.register(ArcElement, Tooltip, Legend);

//todo replace with calls to actual data
export const chartData = {
  labels: ["Netflix", "Car", "Phone"],
  datasets: [
    {
      label: "Spending",
      data: [14.85, 250, 50], // Dollar amounts for each category.
      backgroundColor: ["red", "purple", "blue", "green", "orange", "yellow"],
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
      <div className="CurrentBudgetStatus" id="currentbudgetstatus">
        Current Budget Status
        <Pie
          data={chartData}
          onElementsClick={(elems) => {
            // if required to build the URL, you can
            // get datasetIndex and value index from an `elem`:
            console.log(elems[0]._datasetIndex + ", " + elems[0]._index);
            console.log("click");
            // and then redirect to the target page:
            window.location = "https://example.com";
          }}
        />
        
        <Button
          id="toggleBtn"
          // onClick={ () => { ModalFullscreenExample ()}}

          onClick={() => {
            let window = document.getElementById("currentbudgetstatus");
            let toggle = document.getElementById(`toggleBtn`);
            if ((toggle.textContent = "Expand")) {
              // CurrentBudgetStatus.style.position = ("fixed");
              window.style.position = "fixed";
              window.style.top = "10%";
              window.style.left = "10%";
              window.style.width = "80vw";
              window.style.height = "80vh";
              window.style.margin = ".5rem solid black";
              toggle.innerText = "Collapse";
            } else {
              // toggle.addEventListener("click", () => {
              toggle.onclick=("click", () => {
                
                window.style.position = "initial";
                window.style.position = "initial";
                window.style.top = "initial";
                window.style.left = "initial";
                window.style.width = "initial";
                window.style.height = "initial";
                window.style.margin = "initial";
                toggle.innerText = "Expand";
              });
            }
          }}
        >
          Expand
        </Button>
      </div>
    </>
  );
}

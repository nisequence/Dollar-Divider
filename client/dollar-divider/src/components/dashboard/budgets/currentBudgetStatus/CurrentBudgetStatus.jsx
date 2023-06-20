import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useParams } from "react-router-dom";
// import React, { useRef } from "react";
// import React, {useState} from "react";
// import ModalFullscreenExample from "../../../../utils/modalExample";
// import { Form, FormGroup, Input, Label, Button } from "reactstrap";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CurrentBudgetStatus(props) {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Personal Spending",
        data: [], // Dollar amounts for each category.
        backgroundColor: [
          "yellow",
          "red",
          "purple",
          "blue",
          "green",
          "seagreen",
          "darkorange",
          "sienna",
          "mediumpurple",
          "powderblue",
        ],

      },
    ],
  };
  //! -------------------------- Can't easily display dollar formatting --------------------
  props.budgets.map((i) => {
    chartData.labels.push(i.budgetCat);
    let newBudgetCost = [i][0].budgetAmt;
    chartData.datasets[0].data.push(newBudgetCost);
  });

  const { id } = useParams();

  // Headers
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // setting our content to be passed
  myHeaders.append("Authorization", props.token);

  // Build url variable

  // Construct the body object & JSON stringify it
  let bodyObj = JSON.stringify({}); // JSON-ifying our data to be passed.

  // Request Options object
  return (
    <>
      <div className="CurrentBudgetStatus" id="currentbudgetstatus">
        Current Budget Status
        {/* <Doughnut */}
        <Pie
          data={chartData}
          // onElementsClick={(elems) => {
          //   // if required to build the URL, you can
          //   // get datasetIndex and value index from an `elem`:
          //   // and then redirect to the target page:
          //   window.location = "https://example.com";
          // }}
        />
        <Button
          id="expandBtn"
          // onClick={ () => { ModalFullscreenExample ()}}

          // ! Temporarily disabled expand button
          // onClick={() => {
          //   let window = document.getElementById("currentbudgetstatus");
          //   let expandBtn = document.getElementById(`expandBtn`);
          //   if ((expandBtn.textContent = "Expand")) {
          //     // CurrentBudgetStatus.style.position = ("fixed");
          //     window.style.position = "fixed";
          //     window.style.top = "10%";
          //     window.style.left = "10%";
          //     window.style.width = "80vw";
          //     window.style.height = "80vh";
          //     window.style.margin = ".5rem solid black";

          //     expandBtn.innerText = "Collapse";
          //   } else {
          //     // toggle.addEventListener("click", () => {
          //     expandBtn.onclick =
          //       ("click",
          //       () => {
          //         window.style.position = "initial";
          //         window.style.position = "initial";
          //         window.style.top = "initial";
          //         window.style.left = "initial";
          //         window.style.width = "initial";
          //         window.style.height = "initial";
          //         window.style.margin = "initial";
          //         expandBtn.innerText = "Expand";
          //       });
          //   }
          // }}
        >
          Expand
        </Button>
      </div>
    </>
  );
}

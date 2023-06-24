// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut, PolarArea } from "react-chartjs-2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import AddBudget from "./AddBudget/AddBudget";
// import React, { useRef } from "react";
// import React, {useState} from "react";
// import ModalFullscreenExample from "../../../../utils/modalExample";
// import { Form, FormGroup, Input, Label, Button } from "reactstrap";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CurrentBudgetStatus(props) {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Personal Spending",
        data: [], // Dollar amounts for each category.
        backgroundColor: [
          "rgba(255, 255, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
          "rgba(128, 0, 128, 0.5)",
          "rgba(0, 0, 255, 0.5)",
          "rgba(0, 128, 0, 0.5)",
          "rgba(255, 140, 0, 0.5)",
          "rgba(46, 139, 86, 0.5)",
          "rgba(176, 224, 230, 0.5)",
          "rgba(160, 81, 45, 0.5)",
          "rgba(147, 112, 216, 0.5)",
        ],
      },
    ],
  };
  //! -------------------------- Can't easily display dollar formatting --------------------
  // todo filter through the transactions array to find the transaction categories that match the budget category names, add all those that match (maybe add misc category later), subtract transaction sum from total budget amount and display in the chart

  if (props.budgets === undefined) {
    chartData.labels.push("Budget is Empty");
    let budgetCategoryTotal = 0;
    let amountSpent = 0; //todo edit this to reflect the transactions for each category
    chartData.datasets[0].data.push(budgetCategoryTotal - amountSpent);
    chartData.datasets[0].backgroundColor[0] = "";
  } else {
    props.budgets?.map((i) => {
      chartData.labels.push(i.budgetCat);
      let budgetCategoryTotal = [i][0].budgetAmt;
      let amountSpent = 0; //todo edit this to reflect the transactions for each category
      chartData.datasets[0].data.push(budgetCategoryTotal - amountSpent);
    });
  }
  // console.log("props.transactions:",props.transactions)
  // console.log("props.budgets:",props.budgets)
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
        Remaining Monthly Amounts
        <AddBudget token={props.token} />
        {/* <Doughnut */}
        <PolarArea
          style={{ marginLeft: "4vw", marginRight: "4vw", maxHeight: "60vh" }}
          // <Pie
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

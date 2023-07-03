// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import AddBudget from "./AddBudget/AddBudget";
import { useEffect } from "react";
import Selector from "./Selector/Selector";

// import React, { useRef } from "react";
// import React, {useState} from "react";
// import ModalFullscreenExample from "../../../../utils/modalExample";
// import { Form, FormGroup, Input, Label, Button } from "reactstrap";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CurrentBudgetStatus(props) {
  const status = sessionStorage.getItem("Status");

  const setTotal = (updatedTotal) => {
    if (props.view === true) {
      sessionStorage.setItem("Total", updatedTotal);
    }
  };

  const viewType = () => {
    let total = 0;
    const totalBudgets = () => {
      for (let x = 0; x < props.budgets?.length; x++) {
        let thisOne = props.budgets[x].budgetAmt;
        total += thisOne;
      }
      console.log(total);
      console.log(props.view);
    };
    totalBudgets();
    setTotal(total);

    if (props.view === false || status === "Admin") {
      //* If viewing personal or if user is the Admin
      // get all the stuff
      return (
        <>
          <h4>Budget Overview</h4>
          <AddBudget
            token={props.token}
            view={props.view}
            getBudgets={props.getBudgets}
          />
          <h5>Total Budgeted: ${total.toLocaleString("en-US")}</h5>
        </>
      );
    } else {
      //* If viewing household and not the admin
      // get minimal
      return (
        <>
          <h4>Budget Overview</h4>
          <h5>Total Budgeted: ${total}</h5>
        </>
      );
    }
  };

  useEffect(() => {
    if (props.budgets) {
      viewType();
    }
  }, [props.token, props.budgets, props.view]);

  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Budget Amount",
        data: [], // Dollar amounts for each category.
        // options: { onClick: clicked },
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

  // Build a fn to return the edit and delete button

  // Request Options object
  return (
    <>
      <div className="CurrentBudgetStatus" id="currentbudgetstatus">
        {viewType()}
        <Selector
          token={props.token}
          view={props.view}
          getBudgets={props.getBudgets}
          budgets={props.budgets}
        />
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

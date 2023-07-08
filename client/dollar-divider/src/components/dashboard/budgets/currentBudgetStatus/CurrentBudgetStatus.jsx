// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Button, Container, Row, Col } from "reactstrap";
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

  // const setHouseholdTotal = () => {
  //   if (props.view === true) {
  //     let totalToDivide = 0;
  //     const totalBudgets = () => {
  //       for (let x = 0; x < props.budgets?.length; x++) {
  //         let thisOne = props.budgets[x].budgetAmt;
  //         totalToDivide += thisOne;
  //       }
  //       console.log(totalToDivide);
  //       console.log(props.view);
  //       sessionStorage.setItem("Total", totalToDivide);
  //     };
  //     totalBudgets();
  //   }
  // };

  const viewType = () => {
    // setHouseholdTotal();

    let total = props.totalToDisplay;
    // const totalBudgets = () => {
    //   for (let x = 0; x < props.budgets?.length; x++) {
    //     let thisOne = props.budgets[x].budgetAmt;
    //     total += thisOne;
    //   }
    // };
    // totalBudgets();

    if (props.view === false || status === "Admin") {
      //* If viewing personal or if user is the Admin
      // get all the stuff
      let displayTotal = Number(total);
      let roundTotal = displayTotal.toFixed(2);
      return (
        <>
          <h4>Budget Overview</h4>
          <Row id="AddBudgetHeader">
            <Col>
              <h5>
                <i>Total Budgeted: ${roundTotal}</i>
              </h5>
            </Col>
            <Col>
              <AddBudget
                token={props.token}
                view={props.view}
                getBudgets={props.getBudgets}
              />
            </Col>
          </Row>
          <Selector
            token={props.token}
            view={props.view}
            getBudgets={props.getBudgets}
            budgets={props.budgets}
            id={props.id}
          />
        </>
      );
    } else {
      //* If viewing household and not the admin
      // get minimal
      let displayTotal = Number(total);
      let roundTotal = displayTotal.toFixed(2);
      return (
        <>
          <h4>Budget Overview</h4>
          <Row id="TotalBudgetHeader">
            <h5>
              {" "}
              <i>Total Budgeted: ${roundTotal}</i>
            </h5>
          </Row>
        </>
      );
    }
  };

  useEffect(() => {
    if (props.token) {
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

  return (
    <>
      <Container>
        <div className="CurrentBudgetStatus">
          {viewType()}
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
        </div>
      </Container>
    </>
  );
}

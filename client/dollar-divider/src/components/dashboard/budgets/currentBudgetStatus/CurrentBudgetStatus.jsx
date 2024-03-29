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
import { useEffect, useState } from "react";
import Selector from "./Selector/Selector";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// ChartJS.register(ArcElement, Tooltip, Legend);

export default function CurrentBudgetStatus(props) {
  let colorIndex = 0;
  let colorList = [
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
  ];
  let total;
  const status = sessionStorage.getItem("Status");
  const viewType = () => {
    let total = props.totalToDisplay;

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
                budgets={props.budgets}
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

  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Over/Under Budget",
        data: [], // Dollar amounts for each category.
        backgroundColor: [],
      },
    ],
  };

  //! -------------------------- Can't easily display dollar formatting --------------------
  // console.log("currentbudgetstatusprops.transaction",props.transaction)
  const fillInChart = async () => {
    // props.getBudgets()
    // If there are no budget items, blank out everything
    try {
      if (!props.budgets) {
        // if (props.budgets === undefined) {
        chartData.labels.push("Budget is Empty");
        let budgetCategoryTotal = 0;
        let amountSpent = 0;
        total = budgetCategoryTotal - amountSpent;
        chartData.datasets[0].data.push(total);
      } else {
        // console.log("here")
        // console.log("fillinchartbudgets",props)
        props.budgets?.map((item) => {
          chartData.labels.push(item.budgetCat);
          let amountSpent = 0;
          // If the item (iterated) budget amount is less than zero, turn the color black
          try {
            props.transaction.map((i) => {
              if (i.category === item.budgetCat) {
                amountSpent += i.amount;
              }
            });
            if (amountSpent + item.budgetAmt < 0) {
              chartData.datasets[0].backgroundColor.push("black");
              if (colorIndex + 1 <= 9) {
                colorIndex++;
              } else {
                colorIndex = 0;
              }
            } else {
              chartData.datasets[0].backgroundColor.push(colorList[colorIndex]);
              if (colorIndex + 1 <= 9) {
                colorIndex++;
              } else {
                colorIndex = 0;
              }
            }
            let budgetCategoryTotal = [item][0].budgetAmt;
            chartData.datasets[0].data.push(budgetCategoryTotal + amountSpent);
          } catch (err) {
            console.log(err);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  fillInChart();
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
          />
        </div>
      </Container>
    </>
  );
}

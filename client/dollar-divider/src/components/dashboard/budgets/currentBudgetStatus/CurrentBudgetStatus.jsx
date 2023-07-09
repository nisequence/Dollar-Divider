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
  "rgba(147, 112, 216, 0.5)",]
  let total;
  const status = sessionStorage.getItem("Status");
  const viewType = () => {
<<<<<<< HEAD
    let total = 0;
    const totalBudgets = () => {
      for (let x = 0; x < props.budgets?.length; x++) {
        let thisOne = props.budgets[x].budgetAmt;
        total += thisOne;
      }
    };

    totalBudgets();
=======
    // setHouseholdTotal();

    let total = props.totalToDisplay;
    // const totalBudgets = () => {
    //   for (let x = 0; x < props.budgets?.length; x++) {
    //     let thisOne = props.budgets[x].budgetAmt;
    //     total += thisOne;
    //   }
    // };
    // totalBudgets();
>>>>>>> 093c00ce704c49001fa000c34ae6d076c30fa70e

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
<<<<<<< HEAD
            getTransaction={props.getTransaction}
=======
            budgets={props.budgets}
            id={props.id}
>>>>>>> 093c00ce704c49001fa000c34ae6d076c30fa70e
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
        backgroundColor: [
        ],
      },
    ],
  };

  //! -------------------------- Can't easily display dollar formatting --------------------

  const fillInChart = async () => {
    // If there are no budget items, blank out everything
    if (props.budgets === undefined) {
      chartData.labels.push("Budget is Empty");
      let budgetCategoryTotal = 0;
      let amountSpent = 0;
      total = budgetCategoryTotal - amountSpent;
      chartData.datasets[0].data.push(total);
    } else {
      
      props.budgets?.map((item) => {
        chartData.labels.push(item.budgetCat);
        let amountSpent = 0;
        // If the item (iterated) budget amount is less than zero, turn the color black
        props.transaction.map((i) => {
          if (i.category === item.budgetCat) {
            amountSpent += i.amount
          }
        })
        if (amountSpent+item.budgetAmt < 0) {
          chartData.datasets[0].backgroundColor.push("black");
          if (colorIndex +1 <= 9) {colorIndex ++} else {colorIndex = 0}
        } else {
          chartData.datasets[0].backgroundColor.push(colorList[colorIndex])
          if (colorIndex +1 <= 9) {colorIndex ++} else {colorIndex = 0}
        }
        let budgetCategoryTotal = [item][0].budgetAmt;
        chartData.datasets[0].data.push(budgetCategoryTotal + amountSpent);
      });
    }
  };

  fillInChart();
  return (
    <>
<<<<<<< HEAD
      <div className="CurrentBudgetStatus" id="currentbudgetstatus">
        {viewType()}
        <Selector
          token={props.token}
          view={props.view}
          getBudgets={props.getBudgets}
          budgets={props.budgets}
          id={props.id}
        />
        <PolarArea
          style={{ marginLeft: "4vw", marginRight: "4vw", maxHeight: "60vh" }}
          // <Pie
          data={chartData}
        />
      </div>
=======
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
>>>>>>> 093c00ce704c49001fa000c34ae6d076c30fa70e
    </>
  );
}

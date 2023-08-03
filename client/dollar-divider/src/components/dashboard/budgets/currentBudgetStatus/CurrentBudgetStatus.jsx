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
  const [tempTransactionInfo, setTempTransactionInfo] = useState()
  // let empTransactionInfo = props.transaction;
const [chartData, setChartData] = useState(
  {
    labels: [],
    datasets: [
      {
        label: "Remaining Budget Amount",
        data: [], // Dollar amounts for each category.
        backgroundColor: [],
      },
    ],
  }
)

if (tempTransactionInfo != props.transaction) {
  setTempTransactionInfo(props.transaction)
}

console.log("temptransinfo",tempTransactionInfo)
  // const [budgetStatus, setBudgetStatus] = useState();

  // useEffect (() => {

  // })
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


  
  // console.log("currentbudgetprops",props)
  useEffect (() => {
    if (props.budgets === null) {
      console.log("null")
      setChartData ([])
  }
  else {
  
  // useEffect (() => {
    let tempChartData;
    tempChartData = {
      labels: [],
      datasets: [
        {
          label: "Remaining Budget Amount",
          data: [], // Dollar amounts for each category.
          backgroundColor: [],
        },
      ],
    };

    // try {
      if (!props.budgets || props.budgets === null) {
        // if (props.budgets === undefined) {
        chartData.labels.push("Budget is Empty");
        let budgetCategoryTotal = 0;
        let amountSpent = 0;
        total = budgetCategoryTotal - amountSpent;
        chartData.datasets[0].data.push(total);
      } else {
        // console.log("mapping props.budgets");
        props.budgets?.map(
          (item) => {
            tempChartData.labels.push(item.budgetCat);
            let amountSpent = 0;
            // If the item (iterated) budget amount is less than zero, turn the color black
            // try {
            tempTransactionInfo.map((i) => {
              if (i.category === item.budgetCat) {
                amountSpent += i.amount;
                //! This could be where the problem with multiple categories turning black is. Maybe move the next if else into this block?
              }
            });
            if (amountSpent + item.budgetAmt < 0) {
              tempChartData.datasets[0].backgroundColor.push("black");
              if (colorIndex + 1 <= 9) {
                colorIndex++;
              } else {
                colorIndex = 0;
              }
            } else {
              tempChartData.datasets[0].backgroundColor.push(colorList[colorIndex]);
              if (colorIndex + 1 <= 9) {
                colorIndex++;
              } else {
                colorIndex = 0;
              }
            }
            let budgetCategoryTotal = [item][0].budgetAmt;
            tempChartData.datasets[0].data.push(budgetCategoryTotal + amountSpent);
            // } catch (err) {
            // console.error(err);
          }
          // }
        );
      }
      // useEffect (() => {

      console.log("props",props)
        console.log("tempChartData",tempChartData.datasets[0].data.toString())
        console.log("chartData", chartData.datasets[0].data.toString())
        // if (tempChartData !== null) {
        if (tempChartData.datasets[0].data.toString() !== chartData.datasets[0].data.toString()) {
          if (props.budgets !== null) {
        console.log("unequal")
        console.log(props.budgets)
        setChartData(tempChartData)
      } else {
          console.log("null")
          setChartData ([0])
        // }
        console.log("equal")
        console.log("tempChartData",tempChartData) //! In household view, these are wrong when there is no household
        console.log("chartData",chartData) //! In household view, these are wrong when there is no household
      }
    
    }
    
    }
      // console.log("tempchartdata",tempChartData)
      // })
    // } catch (err) {
      // console.error(err);
    // }
    // console.log("chartDataBefore",chartData)
  // }
  })

  //!Map over the props.transactions, subtract from the props.budgets, compare with chartData, run setChartData(tempChartData) if there is a change

  //! If the dollar amount hits zero, change the budget category label to Name (paid)
  // console.log("chartData",chartData)
  //! -------------------------- Can't easily display dollar formatting --------------------
  // console.log("currentbudgetstatusprops.transaction",props.transaction)
  // const fillInChart = async () => {
  //   // props.getBudgets()
  //   // If there are no budget items, blank out everything
  //   try {
  //     if (!props.budgets) {
  //       // if (props.budgets === undefined) {
  //       chartData.labels.push("Budget is Empty");
  //       let budgetCategoryTotal = 0;
  //       let amountSpent = 0;
  //       total = budgetCategoryTotal - amountSpent;
  //       chartData.datasets[0].data.push(total);
  //     } else {
  //       console.log("mapping props.budgets");
  //       props.budgets?.map(
  //         (item) => {
  //           chartData.labels.push(item.budgetCat);
  //           let amountSpent = 0;
  //           // If the item (iterated) budget amount is less than zero, turn the color black
  //           // try {
  //           props.transaction.map((i) => {
  //             if (i.category === item.budgetCat) {
  //               amountSpent += i.amount;
  //             }
  //           });
  //           if (amountSpent + item.budgetAmt < 0) {
  //             chartData.datasets[0].backgroundColor.push("black");
  //             if (colorIndex + 1 <= 9) {
  //               colorIndex++;
  //             } else {
  //               colorIndex = 0;
  //             }
  //           } else {
  //             chartData.datasets[0].backgroundColor.push(colorList[colorIndex]);
  //             if (colorIndex + 1 <= 9) {
  //               colorIndex++;
  //             } else {
  //               colorIndex = 0;
  //             }
  //           }
  //           let budgetCategoryTotal = [item][0].budgetAmt;
  //           chartData.datasets[0].data.push(budgetCategoryTotal + amountSpent);
  //           // } catch (err) {
  //           // console.error(err);
  //         }
  //         // }
  //       );
  //     }
  //   } catch (err) {
  //     // console.error(err);
  //   }
  // };

  // fillInChart();
  
  

  // console.log("props.budgets",props.budgets)
  // console.log("props.transaction",props.transaction)


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

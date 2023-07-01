import React from "react";
import { Button } from "reactstrap";
import { useRef, useNavigate } from 'react-router-dom';
import CurrentBudgetStatus from "../../currentBudgetStatus/CurrentBudgetStatus";

//* EDIT AND DELETE BUTTONS

export default function UpdateBudgets(props) {

  const navigate = useNavigate();
  //const ChartJS = useRef();

  async function deleteBudget(id) {
    const url = `http://localhost:4000/budgets/${props.id}`;
      
    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
        headers: myHeaders,
        method: 'DELETE'
    }

    try {
        let response = await fetch(url, requestOptions);
        let data = await response.json();

        if(data) {
            props.fetchBudgets();
            // navigate("/dashboard")
        }

    } catch (error) {
        console.error(error);
    }
  }

  // Edit Button will trigger this fn that opens/returns a modal
  // That modal will list out all budget items (i would use a borderless table)
  // To pop the table map over props.budget, need to add in a edit and delete button



  return (
    <>
    
      <Button
          onClick={() => navigate(`/budgets/edit/${props.id}`)}
          color="info"
          >Update Budget
          </Button>
                    
    </>
  )};



import React from "react";
import { Button } from "reactstrap";
import { useRef, useNavigate } from 'react-router-dom';
import CurrentBudgetStatus from "../../currentBudgetStatus/CurrentBudgetStatus";

//* EDIT AND DELETE BUTTONS

export default function UpdateBudgets(props) {

  let newInfo = props.NewInfo;
    let BudgetID = newInfo._id;
  
    const budgetCatRef = useRef(); // dropdown
    const budgetAmtRef = useRef();
    const assignedUserRef = useRef(); // dropdown
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);
  
    let categoryOptions = props.budgets;

  //* DELETE FUNCTION
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

  
//* EDIT BUDGET
  const editBudget = async () => {
    e.preventDefault();

    const budgetAmt= budgetAmtRef.current.value;
    const budgetCat = budgetCatRef.current.value;
    const assignedUser = assignedUserRef.current.value;
    const id = BudgetID;

    // Edit fetch
    let url = `http://localhost:4000/budget/edit/${id}`;

    let newBudgetObj = JSON.stringify({
      budgetAmt: budgetAmt,
      budgetCat: budgetCat,
      assignedUser: assignedUser,
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", props.token);

    const reqOption = {
      headers: headers,
      body: newBudgetObj,
      method: "PATCH",
    };

    try {
      const res = await fetch(url, reqOption);
      const data = await res.json();

      // If the server provides a success message
      if (data.message == "Budget has been updated successfully") {
        props.getBudgets(props.view);
        toggle();
      } else {
        // Do nothing, maybe build an error component later to tell the user to re-configure their item
        console.error("Error when editing bill");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Button will trigger this fn that opens/returns a modal: 
  // That modal will list/table tag out all budget items (i would use a borderless table)
  // To pop the table map over props.budget, need to add in a edit and delete button
  // in the map create a <tr> w/<td> budget cat, amount, & edit and delete button
  // When you click edit(need an onclick that turn each <td> into an input, also change the edit button td to a new update button)
  // Click the update button, run the fetch and go back to dashboard
  const displayModal = () => {
    
    return(
      <>
      </>
    )
  }


  return (
    <>
    
      <Button
          onClick={displayModal()}
          color="success"
          >Update Budget
          </Button>
                    
    </>
  )};

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Open
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Viewing {newInfo.budgetCat} Budget
        </ModalHeader>
        <Form onSubmit={editBudget}>
          <ModalBody>
            <FormGroup>
              <Label input>
                Category
                <i> (Currently: {newInfo.budgetCat})</i>
              </Label>
              <Input
                placeholder={props.newInfo.budgetCat}
                id="exampleSelect1"
                name="select"
                type="select"
                innerRef={budgetCatRef}
                required
              >
                {categoryOptions?.map((each) => {
                  return (
                    <>
                      <option>{each.budgetCat}</option>
                    </>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label input>
                Amount
                <i> (Currently: ${newInfo.budgetAmt})</i>
              </Label>
              <Input
                placeholder={newInfo.budgetAmt}
                innerRef={budgetAmtRef}
                autoComplete="off"
                type="Number"
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <DeleteBill
              token={props.token}
              getBudgets={props.getBudgets}
              id={budgetID}
            />
            <Button color="primary" id="submit">
              Submit Changes
            </Button>{" "}
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );





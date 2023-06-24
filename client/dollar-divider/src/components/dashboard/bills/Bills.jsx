import React from "react";
import { Table, Button } from "reactstrap";
export default function Bills() {
  const placeholderData = [
    {
      title: "sample bill 1",
      desc: "sample bill #1",
      merchant: "sample merchant",
      amount: 900,
      active: true,
      dueDate: "2023-05-15T04:00:00.000Z",
      recurring: true,
      autoPay: true,
      category: "sample",
      password: "password123",
      nextDate: "2023-06-15T04:00:00.000Z",
    },
    {
      title: "sample bill 2",
      desc: "sample bill #2",
      merchant: "sample merchant",
      amount: 900,
      active: true,
      dueDate: "2023-05-15T04:00:00.000Z",
      recurring: true,
      autoPay: true,
      category: "sample",
      password: "password123",
      nextDate: "2023-06-15T04:00:00.000Z",
    },
    {
      title: "sample bill 3",
      desc: "sample bill #3",
      merchant: "sample merchant",
      amount: 900,
      active: true,
      dueDate: "2023-06-15T04:00:00.000Z",
      recurring: true,
      autoPay: true,
      category: "sample",
      password: "password123",
      nextDate: "2023-07-15T04:00:00.000Z",
    },
    {
      title: "sample bill 4",
      desc: "sample bill #4",
      merchant: "sample merchant",
      amount: 900,
      active: true,
      dueDate: "2023-06-15T04:00:00.000Z",
      recurring: true,
      autoPay: true,
      category: "sample",
      password: "password123",
      nextDate: "2023-07-15T04:00:00.000Z",
    },
    {
      title: "sample bill 5",
      desc: "sample bill #5",
      merchant: "sample merchant",
      amount: 900,
      active: true,
      dueDate: "2023-07-15T04:00:00.000Z",
      recurring: true,
      autoPay: true,
      category: "sample",
      password: "password123",
      nextDate: "2023-08-15T04:00:00.000Z",
    },
    {
      title: "sample bill 6",
      desc: "sample bill #6",
      merchant: "sample merchant",
      amount: 900,
      active: true,
      dueDate: "2023-07-15T04:00:00.000Z",
      recurring: true,
      autoPay: true,
      category: "sample",
      password: "password123",
      nextDate: "2023-08-15T04:00:00.000Z",
    },
    {
      title: "sample bill 7",
      desc: "sample bill #7",
      merchant: "sample merchant",
      amount: 900,
      active: true,
      dueDate: "2023-08-15T04:00:00.000Z",
      recurring: true,
      autoPay: true,
      category: "sample",
      password: "password123",
      nextDate: "2023-09-15T04:00:00.000Z",
    },
    {
      title: "sample bill 8",
      desc: "sample bill #8",
      merchant: "sample merchant",
      amount: 900,
      active: true,
      dueDate: "2023-08-15T04:00:00.000Z",
      recurring: true,
      autoPay: true,
      category: "sample",
      password: "password123",
      nextDate: "2023-09-15T04:00:00.000Z",
    },
  ];

  const Prev = document.getElementById("Prev");
  const Next = document.getElementById("Next");

  let nextPage = () => {
    console.log("next page clicked");
  };
  let prevPage = () => {
    console.log("prev page clicked");
  };

  const props = placeholderData;
  // console.log("propsdata:",props)
  const upcomingBills = [];
  const tempUpcomingBills = [];
  let colorAssignment = 0;
  let tempColor;
  props.map((i) => {
    tempUpcomingBills.push(i);
  });

  tempUpcomingBills.map((bill) => {
    if (colorAssignment === 0) {
      tempColor = "table-warning";
      colorAssignment = 1;
    } else {
      tempColor = "table-primary";
      colorAssignment = 0;
    }
    return upcomingBills.push(
      <tr className={tempColor}>
        <td>{bill.title}</td>
        {/* <td>
      {bill.active}
    </td> */}
        <td>{bill.amount}</td>
        {/* <td>
    {bill.autoPay}
    </td> */}
        {/* <td>
    {bill.category}
    </td> */}
        {/* <td>
    {bill.description}
    </td> */}
        <td>{bill.dueDate}</td>
        {/* <td>
    {bill.merchant}
    </td> */}
        {/* <td>
    {bill.nextDate}
    </td> */}
        {/* <td>
    {bill.password}
    </td> */}
        {/* <td>
    {bill.recurring}
    </td> */}
      </tr>
    );
  });
  return (
    <div className="upcomingBills">
      <Button className="button" onClick={prevPage} id="Prev">
        Prev
      </Button>
      <Button className="button" onClick={nextPage} id="Next">
        Next
      </Button>
      <div id="upcomingBillsHeader">Upcoming Bills</div>
      <div className="upcomingBillsTable">
        <Table>
          {/* <thead>Upcoming Bills</thead> */}
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>
        Active
      </th> */}
              <th>Amount</th>
              {/* <th>
        Autopay
      </th> */}
              {/* <th>
        Category
      </th> */}
              {/* <th>
        Description
      </th> */}
              {/* <th>
        DueDate
      </th> */}
              {/* <th>
        Merchant
      </th> */}
              <th>NextDate</th>
              {/* <th>
        Password
      </th> */}
              {/* <th>
        Recurring
      </th> */}
              {/* <th>
        Personal/Household
      </th> */}
            </tr>
          </thead>
          <tbody>{upcomingBills}</tbody>
        </Table>
      </div>
    </div>
  );
}

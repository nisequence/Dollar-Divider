import React from 'react'
import { Table } from 'reactstrap'
export default function RecentTransactions(props) {
// console.log("props.transacations",props.transactions)

const recentTransactions = [];
const tempTransactions = [];
let colorAssignment = 0;
let tempColor;
props.transactions.map((i) => {
  tempTransactions.push(i);
});

tempTransactions.map((transaction) => {

  if (colorAssignment === 0) {
    tempColor = "table-success"
    colorAssignment = 1;
  } else {
    tempColor = "table-secondary"
    colorAssignment = 0;
  };
  return (
    recentTransactions.push(
    <tr className={tempColor}>
    <td>
      {transaction.date}
    </td>
    <td>
    {transaction.merchant}
    </td>
    <td>
    ${transaction.amount}
    </td>
    <td>
    {transaction.manualEntry}
    </td>
    <td>
    {transaction.source}
    </td>
    <td>
    {transaction.category}
    </td>
  </tr>)

)

})
  return (
    <div className='RecentTransactions'>
      <Table>
        <thead>Recent Transactions</thead>
  <thead>
    <tr>
      <th>
        Date
      </th>
      <th>
        Merchant
      </th>
      <th>
        Amount
      </th>
      <th>
        Manual Entry
      </th>
      <th>
        Source
      </th>
      <th>
        Category
      </th>
      {/* <th>
        Personal/Household
      </th> */}
    </tr>
  </thead>
  <tbody>
    {recentTransactions}
  </tbody>
</Table>
    </div>
  )
}

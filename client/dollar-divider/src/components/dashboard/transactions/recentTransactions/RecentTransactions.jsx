import React from 'react'
import { Table } from 'reactstrap'
export default function RecentTransactions(props) {
console.log("props",props)

const recentTransactions = [];

// props.transactions.map((i) => {
//   const tempArray = [];
//   let transactionInstance = i.
//   tempArray.push(i.budgetCat);
//   let budgetCategoryTotal = [i][0].budgetAmt;
//   // budgetCategoryTotal / 100 * 
//   chartData.datasets[0].data.push(budgetCategoryTotal);
// });

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
    <tr className="table-primary">
      <td>
        primary
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      {/* <td>
        Cell
      </td> */}
    </tr>
    <tr className="table-secondary">
      <td>
        secondary
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      {/* <td>
        Cell
      </td> */}
    </tr>
    <tr className="table-success">
      <td>
        success
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      {/* <td>
        Cell
      </td> */}
    </tr>
    <tr className="table-danger">
      <td>
        danger
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      {/* <td>
        Cell
      </td> */}
    </tr>
    <tr className="table-warning">
      <td>
        warning
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      {/* <td>
        Cell
      </td> */}
    </tr>
    <tr className="table-info">
      <td>
        info
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      {/* <td>
        Cell
      </td> */}
    </tr>
    <tr className="table-light">
      <td>
        light
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
      {/* <td>
        Cell
      </td> */}
    </tr>
    {/* <tr className="table-dark">
      <td>
        dark
      </td>
      <td>
        Cell
      </td>
      <td>
        Cell
      </td>
    </tr> */}
  </tbody>
</Table>
    </div>
  )
}

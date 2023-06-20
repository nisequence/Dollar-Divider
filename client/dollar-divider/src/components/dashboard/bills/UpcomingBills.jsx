import React from "react";
import Bills from "./upcomingBillsComponents/Bills";
import Next from "./upcomingBillsComponents/Next";
import Previous from "./upcomingBillsComponents/Previous";
import { Button } from "reactstrap";

// import CurrentBudgetStatus from "./CurrentBudgetStatus";
export default function UpcomingBills() {
  return (
    <>
      <div className="UpcomingBillsContainer">
        {" "}
        <div className="UpcomingBillsHeader">
          {" "}
          <div className="Prev"><Previous /></div> Upcoming Bills to Pay <div className="Next"><Next /></div>
        </div>
        <Bills className="UpcomingBills" />
        <Button/>
        {/* <Button id=""/> */}
      </div>
    </>
  );
}
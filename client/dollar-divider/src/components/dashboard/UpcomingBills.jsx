import React from "react";
import Bills from "./Bills";
import Next from "./Next";
import Previous from "./Previous";
import CurrentBudgetStatus from "./CurrentBudgetStatus";
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
      </div>
    </>
  );
}

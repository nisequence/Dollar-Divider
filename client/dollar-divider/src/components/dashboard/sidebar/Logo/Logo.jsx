import React from "react";
import dollarDividerMini from "../../../../media/DollarDividerLogoNoBG.png"

export default function Logo() {
  return (
    <div>
      <img
        id="logoSidebar"
        className="logo"
        src={dollarDividerMini}
        alt="Dollar Divider Logo"
      />
      <br />
      <h6>
        <strong>Dollar Divider</strong>
      </h6>
    </div>
  );
}

import React from "react";
import dollarDividerMini from "../../../../media/favicon.png";

export default function Logo() {
  return (
    <div>
      <img
        id="logoSidebar"
        class="logo"
        src={dollarDividerMini}
        alt="Dollar Divider Logo"
      />
      <br />
      <h5>
        <strong>Dollar Divider</strong>
      </h5>
    </div>
  );
}

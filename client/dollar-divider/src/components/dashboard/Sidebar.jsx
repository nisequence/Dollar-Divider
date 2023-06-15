import React from "react";
import { Progress } from "reactstrap";

export default function Sidebar() {
  return <div id="sidebar" className="Sidebar">
    <header>Sidebar lives here</header>
    <button id="sidebarBtn" onClick={(e) => {
      e.preventDefault()
      const sidebar = document.getElementById("sidebar");
      const sidebarBtn = document.getElementById("sidebarBtn");
      sidebar.style.width = ".5em";
      // sidebar.style.transition = width 2s;
      sidebar.innerText = "";
      sidebarBtn.style.width = ".5em";
      sidebarBtn.style.marginLeft = ".5em";

      
    }}></button>


    </div>;
}

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
} from "reactstrap";

function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "12em") {
      sidebar.style.width = "0";
    } else {
      sidebar.style.height = "100vh";
      sidebar.style.width = "12em";
      sidebar.style.borderRight = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderBottom = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderTop = "solid rgb(144, 144, 144) 2px";
      sidebar.style.borderLeft = "solid rgb(144, 144, 144) 2px";
    }
  };

  return (
    <div className="Sidebar" id="sidebar">
      <Navbar style={{ width: "10rem" }} color="faded" light>
        <NavbarToggler
          onClick={toggleNavbar}
          className="me-2"
          id="sidebarBtn"
        />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              {/* <NavLink href="/components/">Components</NavLink> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Sidebar;
import React, { useState } from "react";
import {
  // Col,
  // Container,
  // Row,
  Form,
  FormGroup,
  Label,
  Input,
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import EditBudgets from "../budgets/EditBudgets";
import Toggle from "../sidebar/Toggle/Toggle";
import Logout from "../../auth/logout/Logout";
import HouseholdSettings from "./householdSettings/HouseholdSettings";

function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
    const sidebar = document.getElementById("sidebar");
    const openSidebarWidth = "17em";
    if (sidebar.style.width === openSidebarWidth) {
      sidebar.style.width = "0";
    } else {
      sidebar.style.height = "100vh";
      sidebar.style.width = openSidebarWidth;
      sidebar.style.borderRight = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderBottom = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderTop = "solid rgb(144, 144, 144) 2px";
      sidebar.style.borderLeft = "solid rgb(144, 144, 144) 2px";
    }
  };

  //! ------------------------- Populate sidebarArray with Menu items -------------------
  // function addIDs() {
  //   let navs = document.getElementsByClassName("nav-item");
  //   // console.log(navs)
  //   {
  //     for (let i = 0; i < navs.length; i++)
  //       navs[i].setAttribute("id", `sidebarItem_${i}`);
  //     // navs[i].setAttribute("style",``)
  //   }
  // }
  // function addLinkAttributes() {
  //   let navLinks = document.getElementsByClassName("nav-link")
  //   for (let i = 0; i < navLinks.length; i++) {
  //     navLinks[i].setAttribute("id", `navLink_${i}`)
  //     // navLinks[i].setAttribute("style", `color: red`)
  //   }
  // }
  //! -------------------------------- Navbar Links ----------------------------
  const logout = "http://www.google.com";
  const householdSettings = (
    <NavLink
      token={props.token}
      status={props.status}
      href="/dashboard/household"
    >
      Household Settings
    </NavLink>
  );
  // }
  // }
  let sidebarArray = ["Menu Item 1", "Menu Item 2", householdSettings];

  // Create a button that opens an edit budget menu.

  const sidebarItems = sidebarArray.map((i) => {
    return <NavItem>{i}</NavItem>;
  });

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
            <br></br>
            <NavItem>
              <Toggle setView={props.setView} view={props.view} />
            </NavItem>
            <br></br>
            {sidebarItems}
            {/* <NavLink href="/components/">Components</NavLink> */}
            <NavItem>{/* <EditBudgets /> */}</NavItem>
            <br></br>
            <NavItem>
              {/* <HouseholdSettings /> */}
              {/* need to pass token here!!! */}
            </NavItem>
            <br></br>
            <NavItem>
              <Logout updateToken={props.updateToken} />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {/* {addIDs()} */}
      {/* {addLinkAttributes()} */}
    </div>
  );
}

export default Sidebar;

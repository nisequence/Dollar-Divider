import React, { useState } from "react";
import {
  // Col,
  // Container,
  // Row,
  // Form,
  // FormGroup,
  // Label,
  // Input,
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
} from "reactstrap";
// import GetAll from "../accounts/getAll/GetAll";
// import EditBudgets from "../budgets/EditBudgets";
import Toggle from "../sidebar/Toggle/Toggle";
import Logout from "../../auth/logout/Logout";
import HouseholdSettings from "./householdSettings/HouseholdSettings";
import UserSettings from "./userSettings/UserSettings";

// --------------------------------- Toggle Left Sidebar -------------------------------------
function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    const sidebar = document.getElementById("sidebar");
    const openSidebarWidth = "14vw";
    if (!collapsed) {
      sidebar.style.width = "0";
      
      sidebar.style.minWidth = "";
      // sidebar.style.opacity = "1";

    } else {
      sidebar.style.height = "100vh";
      sidebar.style.width = openSidebarWidth;
      // sidebar.style.minWidth = "fit-content";
      sidebar.style.borderRight = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderBottom = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderTop = "solid rgb(144, 144, 144) 2px";
      sidebar.style.borderLeft = "solid rgb(144, 144, 144) 2px";
    }
  };

  const [rightSideCollapsed, setRightSideCollapsed] = useState(true);
  const toggleRightSidebar = () => {
    setRightSideCollapsed(!rightSideCollapsed);
    const rightSideMenu = document.getElementById("rightSideMenu");
    // const openRightSidebarWidth = "72vw";
    const openRightSidebarWidth = "95em";
    if (!rightSideCollapsed) {
      rightSideMenu.style.width = "0";
      // rightSideMenu.style.color = "rgba(0,0,0,0)";
      // rightSideMenu.style.minWidth = "fitContent";
      
    } else {
      rightSideMenu.style.height = "100vh";
      rightSideMenu.style.width = openRightSidebarWidth;
      // rightSideMenu.style.maxWidth = "95em";

      // Get the current width of the left menu to base the max width of the right menu, to prevent overlap.
      let temp = "";
      let result = [];
      let W = (document.getElementById("sidebar").style.width)
      for (let item of W) {
        if (temp.length < 2) {
          temp += item;
          result.push(+temp)
        }
      }
      // console.log(typeof result[1])
      // let maxRightWidth = (80-result[1])+"vw";
      // console.log(maxRightWidth)
      // console.log(leftSideWidth, +leftSideWidth)
      // rightSideMenu.style.maxWidth = `${maxRightWidth}vw`;

      // This should take into account the width of the left menu.
      rightSideMenu.style.borderRight = "solid rgb(46, 46, 46) 2px";
      rightSideMenu.style.borderBottom = "solid rgb(46, 46, 46) 2px";
      rightSideMenu.style.borderTop = "solid rgb(144, 144, 144) 2px";
      rightSideMenu.style.borderLeft = "solid rgb(144, 144, 144) 2px";
    }
  };

  //! ------------------------- Populate sidebarArray with Menu items -------------------

  //! -------------------------------- Navbar Links ----------------------------

  let householdSettings = (
    <NavItem
      // token={props.token}
      // status={props.status}
      // href="/dashboard/household"    
    >
      <button onClick={toggleRightSidebar} id="householdSettings">
        Household Settings
      </button>
    </NavItem>
  );
  let userSettings = (
    <NavItem
      // token={props.token}
      // status={props.status}
      // href="/dashboard/household"    
    >
      <button onClick={toggleRightSidebar} id="budgetSettings">
        User Settings
      </button>
    </NavItem>
  );
  let br = (<br></br>)
  let sidebarArray = ["Menu Item 1", "Menu Item 2", userSettings];

  const sidebarItems = sidebarArray.map((i) => {
    return (
    br,
    <NavItem>{i}</NavItem>)
  });

  return (
    <div className="Sidebar" id="sidebar">
      <Navbar style={{ width: "10rem" }} color="faded" light>
        <NavbarToggler
          onClick={toggleSidebar}
          className="me-2"
          id="sidebarBtn"
        />
        <Collapse horizontal isOpen={!collapsed} navbar>
          <Nav navbar>
            <br></br>
            <NavItem>
              <Toggle setView={props.setView} view={props.view} />
            </NavItem>
            <br></br>
            {sidebarItems}
            <NavItem>{/* <EditBudgets /> */}</NavItem>
            <br></br>
            <NavItem>
              <Logout updateToken={props.updateToken} />
            </NavItem>

            {/* <HouseholdSettings token={props.token} /> */}
            <UserSettings token={props.token} />

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Sidebar;

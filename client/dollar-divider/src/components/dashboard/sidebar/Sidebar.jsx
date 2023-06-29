import React, { useState } from "react";
import { v4 } from "uuid";
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
  Button,
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
      document.getElementById("sidebarItems").style.visibility = "hidden"
      sidebar.style.width = "0";
      sidebar.style.minWidth = "";
    } else {
      sidebar.style.height = "100vh";
      sidebar.style.width = openSidebarWidth;
      // sidebar.style.minWidth = "fit-content";
      sidebar.style.borderRight = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderBottom = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderTop = "solid rgb(144, 144, 144) 2px";
      sidebar.style.borderLeft = "solid rgb(144, 144, 144) 2px";
      setTimeout(() => {
        document.getElementById("sidebarItems").style.visibility = "visible"  
      }, 50);
      
    }
  };

  const [userSettingsMenuCollapsed, setUserSettingsMenuCollapsed] = useState(true);
  const toggleUserSettingsMenu = () => {
    setUserSettingsMenuCollapsed(!userSettingsMenuCollapsed);
    const userSettingsMenu = document.getElementById("userSettingsMenu");
    // const openRightSidebarWidth = "72vw";
    const openRightSidebarWidth = "95em";
    if (!userSettingsMenuCollapsed) {
      userSettingsMenu.style.width = "0";
      // rightSideMenu.style.color = "rgba(0,0,0,0)";
      // rightSideMenu.style.minWidth = "fitContent";
    } else {
      if (!householdSettingsMenuCollapsed){
        document.getElementById("householdSettingsMenu").style.width="0";
      }
      setHouseholdSettingsMenuCollapsed(!householdSettingsMenuCollapsed);
      userSettingsMenu.style.height = "100vh";
      userSettingsMenu.style.width = openRightSidebarWidth;
      // rightSideMenu.style.maxWidth = "95em";

      // Get the current width of the left menu to base the max width of the right menu, to prevent overlap.
      let temp = "";
      let result = [];
      let W = document.getElementById("sidebar").style.width;
      for (let item of W) {
        if (temp.length < 2) {
          temp += item;
          result.push(+temp);
        }
      }
      // console.log(typeof result[1])
      // let maxRightWidth = (80-result[1])+"vw";
      // console.log(maxRightWidth)
      // console.log(leftSideWidth, +leftSideWidth)
      // rightSideMenu.style.maxWidth = `${maxRightWidth}vw`;

      // This should take into account the width of the left menu.
      userSettingsMenu.style.borderRight = "solid rgb(46, 46, 46) 2px";
      userSettingsMenu.style.borderBottom = "solid rgb(46, 46, 46) 2px";
      userSettingsMenu.style.borderTop = "solid rgb(144, 144, 144) 2px";
      userSettingsMenu.style.borderLeft = "solid rgb(144, 144, 144) 2px";
    }
  };

  const [householdSettingsMenuCollapsed, setHouseholdSettingsMenuCollapsed] = useState(true);
  const toggleHouseholdSettingsMenu = () => {
    setHouseholdSettingsMenuCollapsed(!householdSettingsMenuCollapsed);
    const householdSettingsMenu = document.getElementById("householdSettingsMenu");
    // const openRightSidebarWidth = "72vw";
    const openRightSidebarWidth = "95em";
    if (!householdSettingsMenuCollapsed) {
      householdSettingsMenu.style.width = "0";
      // rightSideMenu.style.color = "rgba(0,0,0,0)";
      // rightSideMenu.style.minWidth = "fitContent";
    } else {
      if (!userSettingsMenuCollapsed){
        document.getElementById("userSettingsMenu").style.width="0";
      }
      setUserSettingsMenuCollapsed(!userSettingsMenuCollapsed);
      householdSettingsMenu.style.height = "100vh";
      householdSettingsMenu.style.width = openRightSidebarWidth;
      // rightSideMenu.style.maxWidth = "95em";

      // Get the current width of the left menu to base the max width of the right menu, to prevent overlap.
      let temp = "";
      let result = [];
      let W = document.getElementById("sidebar").style.width;
      for (let item of W) {
        if (temp.length < 2) {
          temp += item;
          result.push(+temp);
        }
      }
      // console.log(typeof result[1])
      // let maxRightWidth = (80-result[1])+"vw";
      // console.log(maxRightWidth)
      // console.log(leftSideWidth, +leftSideWidth)
      // rightSideMenu.style.maxWidth = `${maxRightWidth}vw`;

      // This should take into account the width of the left menu.
      householdSettingsMenu.style.borderRight = "solid rgb(46, 46, 46) 2px";
      householdSettingsMenu.style.borderBottom = "solid rgb(46, 46, 46) 2px";
      householdSettingsMenu.style.borderTop = "solid rgb(144, 144, 144) 2px";
      householdSettingsMenu.style.borderLeft = "solid rgb(144, 144, 144) 2px";
    }
  };
  // const toggleHouseholdSettingsMenu = () => {
  //   console.log("HouseholdSettingsMenu Toggled")
  // }
  //! ------------------------- Populate sidebarArray with Menu items -------------------

  //! -------------------------------- Navbar Links ----------------------------

  let toggle = (
    <Toggle setView={props.setView} view={props.view} />
  )

  let householdSettings = (
    <NavItem>
      <button onClick={toggleHouseholdSettingsMenu} id="householdSettingsButton">
        Household Settings
      </button>
    </NavItem>
  );
  let userSettings = (
    <NavItem>
      <button onClick={toggleUserSettingsMenu} id="userSettingsButton">
        User Settings
      </button>
    </NavItem>
  );

  let logout = (
    <Logout updateToken={props.updateToken} />
  )

  
  let br = <br></br>;
  let sidebarArray = [
    toggle,
    userSettings,
    householdSettings,
    logout
  ];

  const sidebarItems = sidebarArray.map((i) => {
    return br, (<NavItem key={v4()}>{i}</NavItem>);
  });

  return (
    <div className="Sidebar" id="sidebar">
      <div style={{ width: "10rem" }} color="faded" light>
        <button
          onClick={toggleSidebar}
          className="me-2"
          id="sidebarBtn"><i className="fa fa-bars"></i></button>
        
        <div>
        {/* <Collapse horizontal isOpen={!collapsed} navbar> */}
          <Nav navbar>
            <br></br>
            <br></br>
            <div id="sidebarItems">
            {sidebarItems}
            </div>
            <NavItem>{/* <EditBudgets /> */}</NavItem>
            <br></br>
            {/* //! Still working on implementation of both buttons working */}
            <HouseholdSettings token={props.token} />
            <UserSettings token={props.token} />
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

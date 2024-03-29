import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Nav, NavItem } from "reactstrap";
import { BsHouseGearFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
// import GetAll from "../accounts/getAll/GetAll";
// import EditBudgets from "../budgets/EditBudgets";
import Toggle from "../sidebar/Toggle/Toggle";
import Logout from "../../auth/logout/Logout";
import HouseholdSettings from "./householdSettings/HouseholdSettings";
import UserSettings from "./userSettings/UserSettings";
import Logo from "./Logo/Logo";
import Greet from "../../auth/greet/Greet";

export default function Sidebar(props) {
  //? UseState constants for each menu and the sidebar
  const [collapsed, setCollapsed] = useState(true);
  const [userSettingsMenuCollapsed, setUserSettingsMenuCollapsed] =
    useState(true);
  const [householdSettingsMenuCollapsed, setHouseholdSettingsMenuCollapsed] =
    useState(true);

  //? Functions
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    const sidebar = document.getElementById("sidebar");
    // const openSidebarWidth = "fit-content";
    // const openSidebarWidth = "16em";
    const openSidebarWidth = "14vw";
    if (!collapsed) {
      document.getElementById("sidebarItems").style.visibility = "hidden";
      sidebar.style.width = "0";
      sidebar.style.minWidth = "";
    } else {
      // sidebar.style.minWidth = "fit-content"
      sidebar.style.height = "100vh";
      sidebar.style.width = openSidebarWidth;
      // sidebar.style.minWidth = "fit-content";
      sidebar.style.borderRight = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderBottom = "solid rgb(46, 46, 46) 2px";
      sidebar.style.borderTop = "solid rgb(144, 144, 144) 2px";
      sidebar.style.borderLeft = "solid rgb(144, 144, 144) 2px";
      setTimeout(() => {
        document.getElementById("sidebarItems").style.visibility = "visible";
      }, 50);
    }
  };

  const toggleUserSettingsMenu = () => {
    setUserSettingsMenuCollapsed(!userSettingsMenuCollapsed);
    const userSettingsMenu = document.getElementById("userSettingsMenu");
    // const openRightSidebarWidth = "72vw";
    const openRightSidebarWidth = "95em";
    if (!userSettingsMenuCollapsed || collapsed === true) {
      userSettingsMenu.style.width = "0";
      userSettingsMenu.style.visibility = "hidden";
      // rightSideMenu.style.color = "rgba(0,0,0,0)";
      // rightSideMenu.style.minWidth = "fitContent";
    } else {
      //! household settings adjustments moved to useEffect
      // if (!householdSettingsMenuCollapsed || collapsed == true) {
      //   document.getElementById("householdSettingsMenu").style.width = "0";
      // }
      // setHouseholdSettingsMenuCollapsed(!householdSettingsMenuCollapsed);
      userSettingsMenu.style.height = "100vh";
      userSettingsMenu.style.width = openRightSidebarWidth;
      setTimeout(() => {
        userSettingsMenu.style.visibility = "visible";
      }, 100);
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

  const toggleHouseholdSettingsMenu = () => {
    setHouseholdSettingsMenuCollapsed(!householdSettingsMenuCollapsed);
    const householdSettingsMenu = document.getElementById(
      "householdSettingsMenu"
    );
    // const openRightSidebarWidth = "72vw";
    const openRightSidebarWidth = "95em";
    if (!householdSettingsMenuCollapsed) {
      householdSettingsMenu.style.width = "0";
      householdSettingsMenu.style.visibility = "hidden";
      // rightSideMenu.style.color = "rgba(0,0,0,0)";
      // rightSideMenu.style.minWidth = "fitContent";
    } else {
      //! userSettings menu adjustments moved to useEffect
      // if (!userSettingsMenuCollapsed) {
      //   document.getElementById("userSettingsMenu").style.width = "0";
      // }
      // setUserSettingsMenuCollapsed(!userSettingsMenuCollapsed);
      householdSettingsMenu.style.height = "100vh";
      householdSettingsMenu.style.width = openRightSidebarWidth;
      setTimeout(() => {
        householdSettingsMenu.style.visibility = "visible";
      }, 100);
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

  useEffect(() => {
    if (collapsed === true) {
      //* if we are closing the sidebar
      if (!userSettingsMenuCollapsed && !householdSettingsMenuCollapsed) {
        // If both HH and user menus are open (this should not technically happen)
        toggleHouseholdSettingsMenu();
        toggleUserSettingsMenu();
        // close them both
      } else if (!userSettingsMenuCollapsed) {
        // if user menu is not collapsed, close it
        toggleUserSettingsMenu();
      } else if (!householdSettingsMenuCollapsed) {
        // if household menu is not collapsed, close it
        toggleHouseholdSettingsMenu();
      }
    }
  }, [collapsed]);
  //* The above useEffect is triggered when the value of collapsed changes

  useEffect(() => {
    if (
      userSettingsMenuCollapsed === false &&
      householdSettingsMenuCollapsed === false
    ) {
      // If one menu is open (false), the other should close (true)
      toggleHouseholdSettingsMenu();
    }
  }, [userSettingsMenuCollapsed]);
  //* The above useEffect is triggered when the value of userSettingsMenuCollapsed changes

  useEffect(() => {
    if (
      householdSettingsMenuCollapsed === false &&
      userSettingsMenuCollapsed === false
    ) {
      // If one menu is open (false), the other should close (true)
      toggleUserSettingsMenu();
    }
  }, [householdSettingsMenuCollapsed]);
  //* The above useEffect is triggered when the value of householdSettingsMenuCollapsed changes

  //! ------ Populate sidebarArray with Menu items ------

  //! ------ Navbar Links ------

  let toggle = <Toggle setView={props.setView} view={props.view} />;

  let householdSettings = (
    <button onClick={toggleHouseholdSettingsMenu} id="householdSettingsButton">
      <BsHouseGearFill /> Household Settings
    </button>
  );
  let userSettings = (
    <button onClick={toggleUserSettingsMenu} id="userSettingsButton">
      <FaUserCog /> User Settings
    </button>
  );

  let logout = <Logout updateToken={props.updateToken} />;

  let logo = <Logo />;

  let welcome = <Greet />;

  let sidebarArray = [
    welcome,
    toggle,
    userSettings,
    householdSettings,
    logo,
    logout,
  ];

  const sidebarItems = sidebarArray?.map((i) => {
    return (
      <div key={sidebarArray.indexOf(i)}>
        <NavItem key={v4()}>{i}</NavItem>
        <br></br>
      </div>
    );
  });

  return (
    <div className="Sidebar" id="sidebar">
      <div style={{ width: "10rem" }} color="faded">
        <button onClick={toggleSidebar} className="me-2" id="sidebarBtn">
          <i className="fa fa-bars"></i>
        </button>

        <div>
          <Nav navbar>
            <br></br>
            <br></br>
            <div id="sidebarItems">{sidebarItems}</div>
            {/*             <NavItem>{<EditBudgets />}</NavItem> */}
            <br></br>
            {/* //! Still working on implementation of both buttons working */}
            <HouseholdSettings token={props.token} />
            <UserSettings updateToken={props.updateToken} token={props.token} />
          </Nav>
        </div>
      </div>
    </div>
  );
}

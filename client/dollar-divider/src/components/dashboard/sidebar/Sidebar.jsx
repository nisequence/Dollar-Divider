import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

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
  function addIDs () {
    let navs = document.getElementsByClassName("nav-item")
    // console.log(navs)
      {
      for (let i = 0; i < navs.length; i++)
      navs[i].setAttribute("id",`sidebarItem_${i}`)
      // navs[i].setAttribute("style",``)
    }
  }
  
    // }
    // }
  let sidebarArray = ["Menu Item 1", "Menu Item 2", "Menu Item 3"];
  const sidebarItems = sidebarArray.map((i) => {
        return (
      <NavItem>{i}</NavItem>
     );
  });
  const logout = "http://www.google.com"
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
            {sidebarItems}
            {/* <NavLink href="/components/">Components</NavLink> */}
            <NavItem><NavLink id="logout" href={logout}>Logout</NavLink></NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {addIDs()}
    </div>
    
  );
}

export default Sidebar;

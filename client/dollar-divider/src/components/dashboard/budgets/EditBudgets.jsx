import React, { useState } from "react";
import {
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

function EditBudgets(props) {


// !---------------------------------------------

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
    const editBudgetsMenu = document.getElementById("editBudgetsMenu");
    const editBudgetsMenuWidth = "47em";
    if (editBudgetsMenu.style.width === editBudgetsMenuWidth) {
      editBudgetsMenu.style.height = 0;
      editBudgetsMenu.style.width = 0;
      editBudgetsMenu.style.borderRight = "initial";
      editBudgetsMenu.style.borderBottom = "initial";
      editBudgetsMenu.style.borderTop = "initial";
      editBudgetsMenu.style.borderLeft = "initial";
    } else {
      editBudgetsMenu.style.height = "100vh";
      editBudgetsMenu.style.width = editBudgetsMenuWidth;
      editBudgetsMenu.style.borderRight = "solid rgb(46, 46, 46) 2px";
      editBudgetsMenu.style.borderBottom = "solid rgb(46, 46, 46) 2px";
      editBudgetsMenu.style.borderTop = "solid rgb(144, 144, 144) 2px";
      editBudgetsMenu.style.borderLeft = "solid rgb(144, 144, 144) 2px";
    }
  };
  function editBudgetsMenuBtn() {
  const editBudgetsMenuBtn = document.getElementById("editBudgetsMenuBtn");
  editBudgetsMenuBtn.textContent = ""
  editBudgetsMenuBtn.addEventListener("click", () => {
  })
}  ;
  
  return (
    <div className="EditBudgetsMenu, me-2" id="editBudgetsMenuBtn">
        <NavbarToggler
          onClick={toggleNavbar}
          className="me-2"
          id="editBudgetsMenuBtn"
        />
        editBudgetsMenuBtn
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
          </Nav>
        </Collapse>
        {editBudgetsMenuBtn}
    </div>
  );
}

export default EditBudgets;


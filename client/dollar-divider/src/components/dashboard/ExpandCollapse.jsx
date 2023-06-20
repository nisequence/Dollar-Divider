// Be sure to define the toggleBtn to match the element's id

export default function expandCollapse (props){
console.log("props: ",props)
    let {toggle, currentWindow} = props
    // if ((props.toggle.textContent = "Expand")) {
      
    //     // CurrentBudgetStatus.style.position = ("fixed");
    //   props.window.style.position = "fixed";
    //   props.window.style.top = "10%";
    //   props.window.style.left = "10%";
    //   props.window.style.width = "80vw";
    //   props.window.style.height = "80vh";
    //   props.window.style.margin = ".5rem solid black";
    //   props.toggle.innerText = "Collapse";
    // } else {
  
    //   props.toggle.addEventListener("click", () => {
    //     // let CurrentBudgetStatus = document.getElementById(
    //     //   "currentbudgetstatus"
    //     // );
    //     // let toggleBtn = document.getElementById(`${toggleBtn}`);
    //     props.window.style.position = ("initial");
    //     props.window.style.position = "initial";
    //     props.window.style.top = "initial";
    //     props.window.style.left = "initial";
    //     props.window.style.width = "initial";
    //     props.window.style.height = "initial";
    //     props.window.style.margin = "initial";
    //     props.toggleBtn.innerText = "Expand";
    //   });
    // }
  console.log(currentWindow, toggle)
  }
  
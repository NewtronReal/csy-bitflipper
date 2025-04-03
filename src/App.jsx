import { useState } from "react";
import "./styles.css"; // Import the CSS file
import Terminal from "./Terminal.jsx";
import BottomPanel from "./BottomPanel.jsx"


export default function App() {
  const [reg1,setReg1] = useState(BigInt("118736678226993062345596789"));
  const [reg2,setReg2] = useState(BigInt("5162464270738828797634643"));
  const [width, setWidth] = useState(400); // Initial sidebar width

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth = Math.min(Math.max(150, e.clientX), window.innerWidth - 100); // Ensure space for main content
    setWidth(newWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const divStyle = {
    backgroundColor:reg1==BigInt(0) ?"lightgreen":"red",
    borderRadius:"10px",
    width:"20px",
    height:"20px",
    position:"relative",
    left:"320px",
    top:"57px"
  }
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar" style={{ width }}>
        <h2>Serial Output</h2>
        <Terminal reg1 ={reg1} reg2={reg2} setReg1={setReg1} setReg2={setReg2}/>
        <p>Commands: read _reg_, reset | available registers:reg1, reg2</p>
      </div>

      {/* Resizable Divider */}
      <div className="resizer" onMouseDown={handleMouseDown}></div>

      {/* Main Content (fills remaining space) */}
      <div className="main-content">
          <div className="diagram-container"><div className="diagram"><div style={divStyle}></div></div></div>
        <BottomPanel reg1 ={reg1} reg2={reg2} setReg1={setReg1} setReg2={setReg2}></BottomPanel>
      </div>
    </div>
  );
}

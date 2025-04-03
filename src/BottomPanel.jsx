import { useState } from "react";
import "./bottompanel.css"

export default function BottomPanel(props) {
  const [vcc, setVcc] = useState("3.3");
  const [gpio0, setGpio0] = useState("0");
  const [gpio1, setGpio1] = useState("0");
  const [gpio2, setGpio2] = useState("0");
  const [gnd, setGnd] = useState("0");

  const handleVoltageCheck = (gpioValue, gpioName) => {
    const vccValue = parseFloat(vcc);
    const gndValue = parseFloat(gnd);
    const gpioVoltage = parseFloat(gpioValue);

    if (isNaN(vccValue) || isNaN(gndValue) || isNaN(gpioVoltage)) {
      alert(`Enter valid voltages first!`);
      return;
    }

    if (vccValue - gndValue > 4) {
      alert("Circuit damaged! Voltage difference exceeded 4V!");
      return;
    }

    if (gpioName === "GPIO0") handleGPIO0();
    if (gpioName === "GPIO1") handleGPIO1();
    if (gpioName === "GPIO2") handleGPIO2();
  };

  const handleGPIO0 = () => {
    const vccValue = parseFloat(vcc)
    const gpio0Value = parseFloat(gpio0)
    const GND = parseFloat(gnd)
    if (gpio0Value - GND > 4) {
      alert("Circuit damaged! Voltage difference exceeded 4V!");
      return;
    }
    if(gpio0Value-GND>=3.3){
        if(vccValue-GND>3.8){
            props.setReg1((props.reg1-props.reg2)%(BigInt("2")**BigInt("128")))
            console.log(props.reg1)
        }else if(vccValue-GND>=3.3){
            props.setReg2((props.reg1-props.reg2)%(BigInt("2")**BigInt("128")))
            console.log(props.reg2)
        }
    }
  };
  const handleGPIO1 = () => {
    const vccValue = parseFloat(vcc)
    const gpio1Value = parseFloat(gpio1)
    const GND = parseFloat(gnd)
    if (gpio1Value - GND > 4) {
      alert("Circuit damaged! Voltage difference exceeded 4V!");
      return;
    }
    if(gpio1Value-GND>=3.3){
        if(vccValue-GND>3.8){
            props.setReg1((props.reg1*BigInt("2"))%(BigInt("2")**BigInt("128")))
        }else if(vccValue-GND>=3.3){
            props.setReg2((props.reg2*BigInt("2"))%(BigInt("2")**BigInt("128")))
        }
    }
  };
  const handleGPIO2 = () => {
    const vccValue = parseFloat(vcc)
    const gpio2Value = parseFloat(gpio2)
    const GND = parseFloat(gnd)
    if (gpio2Value - GND > 4) {
      alert("Circuit damaged! Voltage difference exceeded 4V!");
      return;
    }
    if(gpio2Value-GND>=3.3){
        if(vccValue-GND>3.8){
            props.setReg1((props.reg1/BigInt("2"))%(BigInt("2")**BigInt("128")))
        }else if(vccValue-GND>=3.3){
            props.setReg2((props.reg2/BigInt("2"))%(BigInt("2")**BigInt("128")))
        }
    }
  };

  return (
    <div className="bottom-panel">
      <div className="input-group">
        <label>VCC</label>
        <input type="number" step="0.01" value={vcc} onChange={(e) => setVcc(e.target.value)} />
      </div>

      <div className="input-group">
        <label>GPIO0</label>
        <input type="number" step="0.01" value={gpio0} onChange={(e) => setGpio0(e.target.value)} />
        <button onClick={() => handleVoltageCheck(gpio0, "GPIO0")}>Push</button>
      </div>

      <div className="input-group">
        <label>GPIO1</label>
        <input type="number" step="0.01" value={gpio1} onChange={(e) => setGpio1(e.target.value)} />
        <button onClick={() => handleVoltageCheck(gpio1, "GPIO1")}>Push</button>
      </div>

      <div className="input-group">
        <label>GPIO2</label>
        <input type="number" step="0.01" value={gpio2} onChange={(e) => setGpio2(e.target.value)} />
        <button onClick={() => handleVoltageCheck(gpio2, "GPIO2")}>Push</button>
      </div>

      <div className="input-group">
        <label>GND</label>
        <input type="number" step="0.01" value={gnd} onChange={(e) => setGnd(e.target.value)} />
      </div>
    </div>
  );
}

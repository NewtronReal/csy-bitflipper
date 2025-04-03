import { useState, useRef, useEffect } from "react";
import "./terminal.css"
export default function Terminal(props) {
  const [history, setHistory] = useState(["Welcome to the custom terminal!"]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [history]);
  
  const handleCommand = () => {
    let newHistory = [...history, `> ${input}`];

    let tokens = input.split(" ");
    if(tokens[0]=="clear"){
        setHistory([])
        setInput("")
        return;
    }
    if(tokens.length >2){
        newHistory.push("command not found....")
    }else if(tokens[0]=="read"){
        if(tokens[1] == "reg1"){
            if(props.reg1!=BigInt("0")){
                newHistory.push("Reading reg1:locked")
            }else{
                newHistory.push("Reading reg1:"+props.reg1)
            }
        }else if(tokens[1]=="reg2"){
            newHistory.push('Reading reg2:'+props.reg2)
        }else{
            newHistory.push("unknown register")
        }
    }else if(tokens[0] == "reset"){
        newHistory.push("reseting the values....")
    }else{
        newHistory.push("Unknonw command '"+tokens[0]+"'")
    }
    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="terminal" onClick={() => inputRef.current.focus()}>
      <div className="terminal-output" ref={outputRef}>
        {history.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="terminal-input">
        <span>$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommand()}
        />
      </div>
    </div>
  );
}

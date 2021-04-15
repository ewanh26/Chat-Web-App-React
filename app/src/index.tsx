import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Chatbox from "./components/Chatbox";
import Input from "./components/Input";

ReactDOM.render(
    <React.StrictMode>
        <Chatbox className="chatbox" />
        <Input className="inputField" />
    </React.StrictMode>,
    document.getElementById("root")
);

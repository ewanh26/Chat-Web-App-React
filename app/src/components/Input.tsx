import React from "react";
import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

socket.on("connect", () => {
    console.log(socket.active);
});

export interface InputProps {
    className: string;
}

let Input: React.FC<InputProps> = ({ className }) => {
    const [text, setText] = useState("");

    const handleClick = () => {
        socket.emit("message", { text: text, timeSent: new Date() });
        setText("");
    };

    return (
        <>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                className={className}
            />
            <button className="sendButton" onClick={() => handleClick()}>
                Send
            </button>
        </>
    );
};

export default Input;

import React from "react";
import { useState } from "react";
import { socket, author } from "./Chatbox";
export interface InputProps {
    className: string;
}

let Input: React.FC<InputProps> = ({ className }) => {
    const [text, setText] = useState("");

    const handleClick = () => {
        socket.emit("message", {
            text: text,
            timeSent: new Date(),
            author: author,
        });
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
            <button
                className="sendButton"
                onClick={() => handleClick()}
                //TODO: ON ENTER DO SAME THING
            >
                Send
            </button>
        </>
    );
};

export default Input;

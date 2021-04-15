import React, { FC, useEffect, useState } from "react";
import { MessageProps } from "./Message";
import Message from "./Message";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

export interface ChatboxProps {
    className: string;
}

export interface ChatboxState {
    messages: Array<MessageProps>;
}

let Chatbox: FC<ChatboxProps> = ({ className }) => {
    const [messages, setMessages] = useState<Array<MessageProps>>([]);

    useEffect(() => {
        console.log("use effect");
        const newMessage = (json: MessageProps) => {
            setMessages([...messages, json]);
        };
        socket.on("newMessage", res => {
            console.log("message recieved");
            newMessage(res);
        });
        return () => {
            socket.off("newMessage");
        };
    }, [messages]);

    return (
        <div className={className}>
            {messages.map((message: MessageProps) => (
                <Message text={message.text} timeSent={message.timeSent} />
            ))}
        </div>
    );
};

export default Chatbox;

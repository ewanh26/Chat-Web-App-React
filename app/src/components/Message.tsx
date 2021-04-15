import React, { Component } from "react";

export interface MessageProps {
    text: string;
    author: string;
    timeSent: Date;
}

class Message extends Component<MessageProps> {
    render() {
        return (
            <div className="message">
                <span>{this.props.author}</span>
                <br />
                {this.props.text}&nbsp;
                <span>{this.props.timeSent.toString().slice(11, 16)}</span>
            </div>
        );
    }
}

export default Message;

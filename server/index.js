"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: `http://localhost:3000`,
        methods: ["POST", "GET"],
    },
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/api", (req, res) => {
    res.send(req.body);
});
io.on("connection", (socket) => {
    console.log("SERVER CONNECTED");
    socket.on("message", json_ => {
        axios
            .post("http://localhost:3001/api", {
            message: json_,
        })
            .then(res => {
            console.log(res.data.message);
            io.emit("newMessage", res.data.message);
        })
            .catch(err => {
            console.log(err);
        });
    });
});
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

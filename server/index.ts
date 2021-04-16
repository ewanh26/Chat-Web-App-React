import { Socket } from "socket.io";
import { Request, Response, Application } from "express";
import { AxiosStatic } from "axios";

const express = require("express");
const path = require("path");
const axios: AxiosStatic = require("axios");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app: Application = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: `http://localhost:3000`,
        methods: ["POST", "GET"],
    },
});

// app.get("/", (req: Request, res: Response) => {
//     res.sendFile(path.resolve(__dirname, "../app/build/index.html"));
// });

app.post("/api", (req: Request, res: Response) => {
    res.send(req.body);
});

io.on("connection", (socket: Socket) => {
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

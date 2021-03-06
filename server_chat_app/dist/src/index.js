"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const port = 3001;
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        console.log(`Room Connected: ${data}`);
        socket.join(data);
        console.log(data);
        socket.to(data).emit("An user is entered", data);
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(data);
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

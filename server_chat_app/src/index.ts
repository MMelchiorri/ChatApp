import express from 'express';

const app = express()

import http from "http";

import cors from 'cors';

import { Server } from "socket.io";

const port: number = 3001
const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },


})

io.on("connection", (socket) => {

  console.log(`User connected: ${socket.id}`)

  socket.on("join_room", (data) => {
    console.log(`Room Connected: ${data}`)
    socket.join(data)
    console.log(data)
    socket.to(data).emit("An user is entered",data)

  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
    console.log(data)
  })

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`)
  })

});

server.listen(port, () => {
  console.log(`Server listening on ${port}`)
})


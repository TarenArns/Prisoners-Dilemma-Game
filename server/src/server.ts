import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { login } from'./controller/login/loginHelper.js'
const express = require('express')
const http = require('http')
const { Server } = require("socket.io")
import { PLAYER_TABLE, GAME_TABLE } from "./services/database/constants"
import { fetchRecord, addRecord } from "./services/database/databaseHelper"
import "reflect-metadata"

const app = express()
const server = http.createServer(app)
const api = new Server(server, { cors: { origin: "*"}})

const port = 6769

api.on('connection', (socket) => {
    socket.on('login', (data) => {
        login(data?.user)

        socket.emit("request_response", { status: "success", message: "Logged in"})
    })

})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

io.on('login', (socket: any) => {
  const user = socket.handshake.query.userName

  if (user && !fetchRecord(PLAYER_TABLE, user)) {
    addRecord(PLAYER_TABLE, user)
  }
})

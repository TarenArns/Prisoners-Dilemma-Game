const express = require('express')
const http = require('http')
const { Server } = require("socket.io")
import { PLAYER_TABLE, GAME_TABLE } from "./services/database/constants"
import { fetchRecord, addRecord } from "./services/database/databaseHelper"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = 6769

const userList: {} = [];

io.on('login', (socket: any) => {
    const user = socket.handshake.query.userName

    if(user && !fetchRecord(PLAYER_TABLE, user)) {
        addRecord(PLAYER_TABLE, user)
    }
})
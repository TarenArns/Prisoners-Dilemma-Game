const express = require('express')
const http = require('http')
const { Server } = require("socket.io")
import { PLAYER_TABLE, GAME_TABLE } from "./services/database/constants"
import { fetchRecord, addRecord } from "./services/database/databaseHelper"

const app = express()
const server = http.createServer(app)
const api = new Server(server)

const port = 6769

const userList: {} = [];

api.on('connection', (socket: any) => {
    socket.on('login', (data: any) => {
        const user = data?.user
        if(user && !fetchRecord(PLAYER_TABLE, user)) {
            addRecord(PLAYER_TABLE, {user: user})
        }

        socket.emit("login_response", { status: "success", message: "Logged in"})
    })

})


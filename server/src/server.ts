import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { login } from'./controller/login/loginHelper.js'

import { fetchRecord, addRecord } from "./services/database/databaseHelper"

import "reflect-metadata"
import { DataSource } from "typeorm"
import { Player } from "./services/entity/Player"


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


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "prisoners.db",
  entities: [Player],
  synchronize: true,
  logging: false,
})

try {
  AppDataSource.initialize()
} catch (error) {
  console.log(error)
}

// io.on('login', (socket: any) => {
//   const user = socket.handshake.query.userName
// 
//   if (user && !fetchRecord(user)) {
//     addRecord({ username: user })
//   }
// })

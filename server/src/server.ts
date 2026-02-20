import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { login } from'./services/login/loginHelper.js'

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


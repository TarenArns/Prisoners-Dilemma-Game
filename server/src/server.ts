import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { login } from'./controller/login/loginHelper.js'

const app = express()
const server = http.createServer(app)
const api = new Server(server, { cors: { origin: "*"}})

const port = 6769

app.post("/api/login", (req, res) => {
    const user = req?.body?.user

    if(!user) {
        res.status(500).send("FAILED")
    }

    const ok = login(req.body.user)

    if(ok) {
        res.cookie('token', user, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 7200000
        })

        res.status(200).json({message: "SUCCESS"})
    }
    
})

api.on('connection', (socket) => {
    socket.on('login', (data) => {
        login(data?.user)
        socket.emit("request_response", { status: "success", message: "Logged in"})
    })

})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


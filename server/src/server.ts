import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { login } from './controller/login/loginHelper.js'

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())

const server = http.createServer(app)
const api = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"]
    },
    pingTimeout: 60000,
    pingInterval: 25000
})

const clients = new Map<string, any>()
const port = 6769

app.post("/login", (req, res) => {
    const user = req?.body?.user

    if (!user) {
        return res.status(500).send("FAILED")
    }

    const ok = login(req.body.user)

    if (ok) {
        res.cookie('token', user, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7200000
        })

        res.status(200).send("SUCCESS")
    }
    else {
        res.status(401).send("FAIL")
    }
})

api.on('connection', (socket) => {
    const token = socket.handshake.headers.cookie?.split('token=')[1]?.split(';')[0]

    if (token) {
        clients.set(socket.id, { socketId: socket.id, user: token })
        console.log(`connected!! ${socket.id}, user: ${token}`)
    } else {
        console.log(`loser has no token so were kicking them out: ${socket.id}`)
        socket.disconnect()
        return
    }

    socket.on('disconnect', (reason) => {
        console.log(`Client disconnected: ${socket.id}, reason: ${reason}`)
        clients.delete(socket.id)
    })


    socket.on('error', (error) => {
        console.error(`error (oh no): ${socket.id}`, error)
    })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


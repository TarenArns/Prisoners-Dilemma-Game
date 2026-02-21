import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { login } from'./controller/login/loginHelper.js'

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())

const server = http.createServer(app)
const api = new Server(server, { cors: { origin: "*"}})

const port = 6769

app.post("/login", (req, res) => {
    const user = req?.body?.user
    const ok = login(req.body.user)

    if(ok) {
        res.cookie('token', user, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7200000
        })

        res.status(200).send("SUCCESS")
    }
    
    else if(!user) {
        return res.status(500).send("FAILED")
    }
    else {
        res.status(401).send("FAIL")
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


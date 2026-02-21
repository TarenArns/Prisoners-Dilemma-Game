import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { login } from "./controller/login/loginHelper.js";

import { fetchRecord, addRecord } from "./services/database/databaseHelper.js";

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Player } from "./services/entity/Player.js";
import path from "path";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

const server = http.createServer(app);
const api = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

const clients = new Map<string, any>();
const port = 6769;

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "prisoners.db",
  entities: [Player],
  synchronize: true,
  logging: false,
});

try {
  AppDataSource.initialize();
} catch (error) {
  console.log(error);
}

app.post("/login", async (req, res) => {
  const user = req?.body?.user;

  if (!user) {
    return res.status(500).send("FAILED");
  }

  const ok = await login(req.body.user);

  if (ok) {
    res.cookie("token", user, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7200000,
    });

    res.status(200).send("SUCCESS");
  } else {
    res.status(401).send("FAIL");
  }
});
api.on("connection", (socket) => {
  const token = socket.handshake.headers.cookie
    ?.split("token=")[1]
    ?.split(";")[0];

  if (token) {
    clients.set(socket.id, { socketId: socket.id, user: token });
    console.log(`connected!! ${socket.id}, user: ${token}`);
  } else {
    console.log(`loser has no token so were kicking them out: ${socket.id}`);
    socket.disconnect();
    return;
  }

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
    clients.delete(socket.id);
  });

  socket.on("error", (error) => {
    console.error(`error (oh no): ${socket.id}`, error);
  });
});

app.get("/playerStats", async (req, res) => {
  const players = fetchRecord(null);

  res.status(200).json(players);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

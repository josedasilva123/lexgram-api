import dotenv from "dotenv";
import express from "express";
import cors from "cors"

import UserRoutes from "./routes/User/UserRoutes";
import PostRoutes from "./routes/Post/PostRoutes";
import FollowerRoutes from "./routes/Follower/FollowerRoutes"

import http from "http"
import { Server } from "socket.io"

dotenv.config();

const app = express();

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

app.use('/users', UserRoutes);
app.use('/post', PostRoutes);
app.use('/follower', FollowerRoutes);

export const serverHttp = http.createServer(app);

export const io = new Server(serverHttp);
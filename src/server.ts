import dotenv from "dotenv";
import express from "express";
import cors from "cors"

import UserRoutes from "./routes/User/User.routes";
import PostRoutes from "./routes/Post/Post.routes";
import FollowerRoutes from "./routes/Follower/Follower.routes"

import http from "http"
import { Server } from "socket.io"

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
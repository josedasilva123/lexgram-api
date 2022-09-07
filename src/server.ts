import dotenv from "dotenv";
import express from "express";
import cors from "cors"

import UserRoutes from "./routes/User/User.routes";
import PostRoutes from "./routes/Post/Post.routes";
import FollowerRoutes from "./routes/Follower/Follower.routes"

import Sendgrid from "@sendgrid/mail";


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

app.use('/user', UserRoutes);
app.use('/post', PostRoutes);
app.use('/follower', FollowerRoutes);

export const SendgridMail = Sendgrid;
SendgridMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export const serverHttp = http.createServer(app);

export const io = new Server(serverHttp);
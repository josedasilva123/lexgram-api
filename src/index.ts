import dotenv from "dotenv";
import express from "express";
import cors from "cors"

import { connect } from "./config/db";

import UserRoutes from "./routes/user";
import PostRoutes from "./routes/post";
import FollowerRoutes from "./routes/follower"

dotenv.config();

const app = express();

const port = process.env.PORT || 3030;

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

// app.use('/example', ExampleRoutes);

app.use('/users', UserRoutes);
app.use('/post', PostRoutes);
app.use('/follower', FollowerRoutes);

app.listen(port, async () => {
    await connect();
    console.log(`Aplicação iniciada com sucesso na porta: ${port}`);
})

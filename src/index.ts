import dotenv from "dotenv";
import express from "express";
import cors from "cors"

import { connect } from "./config/db";

import ExampleRoutes from "./routes/example"
import UserRoutes from "./routes/user"

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

app.use('/example', ExampleRoutes);
app.use('/users', UserRoutes);

app.listen(port, async() => {
    await connect();
    console.log(`Aplicação iniciada com sucesso na porta: ${port}`);
})

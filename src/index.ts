import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import mongoose from "mongoose";

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

mongoose.connect(process.env.DATABASE_URL || "")
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(port, () => {
        console.log('[SERVER] API iniciou com sucesso!');
    })
})
.catch((err) => console.log(err));


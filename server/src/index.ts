import express from 'express';
import cors from 'cors';
import { config } from "./config"
import connectDB from "./configurations/db";
import router from "./routes/index";
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

connectDB()

app.use(cors());

app.listen(config.PORT, () => {
    console.log(`\n Server is running on port ${config.PORT} \n`)
})

app.use("/api", router);

app.use(errorHandler);
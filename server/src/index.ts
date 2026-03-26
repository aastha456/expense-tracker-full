import express from 'express';
import cors from 'cors';
import { config } from "./config"
const app = express();

app.use(express.json());

app.use(cors());

app.listen(config.PORT, () => {
    console.log(`\n Server is running on port ${config.PORT} \n`)
})
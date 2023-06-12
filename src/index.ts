import * as env from 'dotenv';
import cors from 'cors';
import express from 'express'


env.config();

const PORT: number = parseInt(process.env.PORT as string);

if (!process.env.PORT) {
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

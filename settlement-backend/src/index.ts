import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import defaultRouter from './api';
import { initTable } from './utils/db';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", defaultRouter);

initTable();
app.listen(5000, () => {
    console.log('Server running on port 5000');
});

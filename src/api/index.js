import express from 'express';
import combination from './combination.api';

const app = express();

app.use('/generate', combination);

export default app;

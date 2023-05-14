import express from 'express';
import peopleRouter from './people.routes.js';

const api = express.Router();

api.use('/people', peopleRouter);

export default api;

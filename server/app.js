import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import api from './routes/api.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/v1/api', api);

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(join(__dirname, '..', 'client', 'dist')));
  app.get('/*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

export default app;

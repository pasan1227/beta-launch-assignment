import { config } from 'dotenv';
import http from 'http';
import app from './app.js';
import connectDb from './config/mongo.js';

config();

const port = process.env.PORT || 5001;
const server = http.createServer(app);

const startServer = () => {
  server.listen(port, async () => {
    console.log(`server is running on port ${port}`);
    await connectDb();
  });
};

startServer();

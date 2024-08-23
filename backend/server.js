import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { connectToDB } from './src/configs/db.js';
import dotenv from 'dotenv';
import userRouter from './src/routers/UserRouter.js';
import cors from 'cors';
import documentRouter from './src/routers/DocumentRoutes.js';
import bodyParser from 'body-parser'
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:5173'], // allow requests from this origin
  credentials: true, // allow credentials (e.g. cookies) to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allow these methods
  headers: ['Content-Type', 'Authorization'] // allow these headers
}));


const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 8080;
const uri = process.env.URI;

// Store documents in memory for simplicity (replace with database in production)
let documents = {};

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a document room
  socket.on('join-document', (documentId) => {
    socket.join(documentId);

    // Send current document data to the new user
    if (documents[documentId]) {
      socket.emit('document-data', documents[documentId]);
    }
  });

  // Handle document changes
  socket.on('edit-document', ({ documentId, content }) => {
    documents[documentId] = content;
    socket.to(documentId).emit('document-update', content);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

//userRoute
app.use('/api/v1/user', userRouter);

//documentRoute
app.use('/api/v1/document',documentRouter )


app.listen(port, async () => {
  try {
    await connectToDB(uri);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log('Error:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
});

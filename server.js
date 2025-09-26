import express from 'express';
import dotenv from 'dotenv';
import ProjectRoutes from './routes/projects/ProjectRoutes.js';
import connectDb from './config/database.js';
import cors from 'cors';

// Enable CORS for all routes

const app = express();
dotenv.config();

const port = process.env.PORT

app.use(cors());

app.use(cors({
    origin: ['http://localhost:5173', 'https://developers.urbantrends.dev'],
    credentials: true
}))

// Middleware
app.use(express.json());

// Routes
app.use('/api', ProjectRoutes);


// connect to db
connectDb();

// starting server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})






import express from 'express';
import dotenv from 'dotenv';
import ProjectRoutes from './routes/projects/ProjectRoutes.js';
import connectDb from './config/database.js';

const app = express();
dotenv.config();

const port = process.env.PORT

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






import express from 'express';
import { addProject, deleteProjectbyId, getAllProjects, getProjectsbyId, updateProjectbyId } from '../../controllers/projects/ProjectsControllers.js';

const router = express.Router();

// routes
router.post('/add-projects', addProject);
router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectsbyId);
router.put('/projects-update/:id', updateProjectbyId);
router.delete('/delete-projects/:id', deleteProjectbyId);

export default router;
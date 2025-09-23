import connectDb from "../../config/database.js";

// add projects
export async function addProject(req, res) {
    const { project_name, tech_stack, project_description, repo_link, live_link } = req.body;

    if (!project_name || !tech_stack || !project_description || !repo_link) {
        return res.status(400).json({ message: 'All fields are required except live_link' });
    }

    try {
        const database = await connectDb();
        const [result] = await database.execute(
            'INSERT INTO urbantrends_developers (project_name, tech_stack, project_description, repo_link, live_link) VALUES (?, ?, ?, ?, ?)',
            [project_name, JSON.stringify(tech_stack), project_description, repo_link, live_link]
        );
        res.status(201).json({ message: 'Project added successfully', projectId: result.insertId });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get all projects
export async function getAllProjects (req, res) {
    try {
        const db = await connectDb();

        const [rows] = await db.execute('SELECT * FROM urbantrends_developers')
        res.json({Projects: rows})
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// get project by id
export async function getProjectsbyId (req, res) {
    try {
        const database = await connectDb();
        const { id } = req.params

        if (!id) {
            return res.status(400).json({message: 'Project id is required'})
        }

        const [rows] = await database.execute('SELECT * FROM urbantrends_developers WHERE id = ?', [id])

        if (rows.length === 0) {
            return res.status(404).json({message: 'Project not found'})
        }

        res.json({Project: rows[0]})
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        res.status(500).json({message: 'Internal server error'});
    }

}

// update project by id
export async function updateProjectbyId (req, res) {
    try {
        const database = await connectDb();
        const { id } = req.params;
        const { project_name, tech_stack, project_description, repo_link, live_link } = req.body;

        if (!id) {
            return res.status(400).json({message: 'Project id is required'})
        }

        // Check if project exists
        const [existingRows] = await database.execute('SELECT * FROM urbantrends_developers WHERE id = ?', [id]);
        if (existingRows.length === 0) {
            return res.status(404).json({message: 'Project not found'})
        }

        // Update project details
        await database.execute(
            'UPDATE urbantrends_developers SET project_name = ?, tech_stack = ?, project_description = ?, repo_link = ?, live_link = ? WHERE id = ?',
            [project_name, tech_stack, project_description, repo_link, live_link, id]
        );

        res.json({message: 'Project updated successfully'});
    } catch (error) {
        console.error('Error updating project by ID:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

// delete project by id
export async function deleteProjectbyId (req, res) {
    try {
        const database = await connectDb();
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({message: 'Project id is required'})
        }

        // Check if project exists
        const [existingRows] = await database.execute('SELECT * FROM urbantrends_developers WHERE id = ?', [id]);
        if (existingRows.length === 0) {
            return res.status(404).json({message: 'Project not found'})
        }

        // Delete project
        await database.execute('DELETE FROM urbantrends_developers WHERE id = ?', [id]);

        res.json({message: 'Project deleted successfully'});
    } catch (error) {
        console.error('Error deleting project by ID:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}
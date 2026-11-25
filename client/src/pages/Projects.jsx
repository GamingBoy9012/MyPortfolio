import { useEffect, useState } from 'react';
import { apiRequest } from '../api';
import { useAuth } from '../AuthContext';

const emptyForm = {
    title: '',
    firstname: 'Dhruvin',
    lastname: 'Suvagiya',
    email: '',
    completion: '',
    description: ''
};

const projectImages = {
    'Cloud Kitchen Database': '/project1.png',
    'GPA Calculator Web App': '/project2.png',
    'One Piece Fan Website': '/project3.png'
};

function Projects() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const loadProjects = async () => {
        try {
            setProjects(await apiRequest('/api/projects'));
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const payload = { ...formData, completion: formData.completion || null };

        try {
            if (editingId) {
                await apiRequest(`/api/projects/${editingId}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
            } else {
                await apiRequest('/api/projects', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
            }

            setFormData(emptyForm);
            setEditingId(null);
            await loadProjects();
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    const editProject = (project) => {
        setEditingId(project._id);
        setFormData({
            title: project.title || '',
            firstname: project.firstname || '',
            lastname: project.lastname || '',
            email: project.email || '',
            completion: project.completion ? project.completion.slice(0, 10) : '',
            description: project.description || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteProject = async (id) => {
        if (!window.confirm('Delete this project?')) return;

        try {
            await apiRequest(`/api/projects/${id}`, { method: 'DELETE' });
            await loadProjects();
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    return (
        <div className="page">
            <h1>My Projects</h1>

            {user?.role === 'admin' && (
                <section className="admin-section">
                    <h2>{editingId ? 'Update Project' : 'Add Project'}</h2>
                    <form className="data-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Project Title</label>
                            <input name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input name="firstname" value={formData.firstname} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input name="lastname" value={formData.lastname} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Completion Date</label>
                            <input type="date" name="completion" value={formData.completion} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
                        </div>
                        <button className="button" type="submit">{editingId ? 'Save Changes' : 'Add Project'}</button>
                        {editingId && <button className="secondary-button" type="button" onClick={() => { setEditingId(null); setFormData(emptyForm); }}>Cancel</button>}
                    </form>
                </section>
            )}

            {error && <p className="error-message">{error}</p>}

            <div className="projects">
                {projects.map((project) => (
                    <article className="project-card" key={project._id}>
                        {projectImages[project.title] && <img src={projectImages[project.title]} alt={project.title} />}
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        {project.firstname && <p><strong>Created by:</strong> {project.firstname} {project.lastname}</p>}
                        {project.completion && <p><strong>Completion:</strong> {new Date(project.completion).toLocaleDateString()}</p>}
                        {user?.role === 'admin' && (
                            <div className="admin-actions">
                                <button className="secondary-button" onClick={() => editProject(project)}>Edit</button>
                                <button className="danger-button" onClick={() => deleteProject(project._id)}>Delete</button>
                            </div>
                        )}
                    </article>
                ))}
                {projects.length === 0 && <p>No projects have been added yet.</p>}
            </div>
        </div>
    );
}

export default Projects;

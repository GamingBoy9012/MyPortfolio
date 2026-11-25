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

function Education() {
    const { user } = useAuth();
    const [educations, setEducations] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const loadEducations = async () => {
        try {
            setEducations(await apiRequest('/api/qualifications'));
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    useEffect(() => {
        loadEducations();
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
                await apiRequest(`/api/qualifications/${editingId}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
            } else {
                await apiRequest('/api/qualifications', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
            }

            setFormData(emptyForm);
            setEditingId(null);
            await loadEducations();
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    const editEducation = (education) => {
        setEditingId(education._id);
        setFormData({
            title: education.title || '',
            firstname: education.firstname || '',
            lastname: education.lastname || '',
            email: education.email || '',
            completion: education.completion ? education.completion.slice(0, 10) : '',
            description: education.description || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteEducation = async (id) => {
        if (!window.confirm('Delete this education record?')) return;

        try {
            await apiRequest(`/api/qualifications/${id}`, { method: 'DELETE' });
            await loadEducations();
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    return (
        <div className="page">
            <h1>Education</h1>

            {user?.role === 'admin' && (
                <section className="admin-section">
                    <h2>{editingId ? 'Update Education' : 'Add Education'}</h2>
                    <form className="data-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title / Institution</label>
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
                        <button className="button" type="submit">{editingId ? 'Save Changes' : 'Add Education'}</button>
                        {editingId && <button className="secondary-button" type="button" onClick={() => { setEditingId(null); setFormData(emptyForm); }}>Cancel</button>}
                    </form>
                </section>
            )}

            {error && <p className="error-message">{error}</p>}

            <div className="education-list">
                {educations.map((education) => (
                    <article className="education-item" key={education._id}>
                        <h2>{education.title}</h2>
                        {education.firstname && <h3>{education.firstname} {education.lastname}</h3>}
                        {education.completion && <p>{new Date(education.completion).toLocaleDateString()}</p>}
                        <p>{education.description}</p>
                        {user?.role === 'admin' && (
                            <div className="admin-actions">
                                <button className="secondary-button" onClick={() => editEducation(education)}>Edit</button>
                                <button className="danger-button" onClick={() => deleteEducation(education._id)}>Delete</button>
                            </div>
                        )}
                    </article>
                ))}
                {educations.length === 0 && <p>No education records have been added yet.</p>}
            </div>
        </div>
    );
}

export default Education;

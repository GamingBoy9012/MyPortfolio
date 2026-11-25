import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            await apiRequest('/api/users', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            setMessage('Account created successfully. You can now sign in.');
            setTimeout(() => navigate('/signin'), 900);
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    return (
        <div className="page">
            <h1>Signup</h1>
            <form className="data-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password (minimum 6 characters)</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} minLength="6" required />
                </div>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <button className="button" type="submit">Create Account</button>
            </form>
            <p className="form-note">Already registered? <Link to="/signin">Sign in</Link></p>
        </div>
    );
}

export default Signup;

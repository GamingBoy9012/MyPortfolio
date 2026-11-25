import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';
import { useAuth } from '../AuthContext';

function Signin() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const data = await apiRequest('/auth/signin', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            login(data.token, data.user);
            navigate('/');
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    return (
        <div className="page">
            <h1>Signin</h1>
            <form className="data-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className="button" type="submit">Signin</button>
            </form>
            <p className="form-note">No account yet? <Link to="/signup">Create one</Link></p>
        </div>
    );
}

export default Signin;

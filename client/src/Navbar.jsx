import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiRequest } from './api';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await apiRequest('/auth/signout');
        } catch (error) {
            console.error(error.message);
        }

        logout();
        navigate('/');
    };

    return (
        <nav>
            <div className="logo">DG</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About Me</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/education">Education</Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact Me</Link>
                {!user && <Link to="/signup">Signup</Link>}
                {!user && <Link to="/signin">Signin</Link>}
                {user && <span className="nav-user">{user.name} ({user.role})</span>}
                {user && <button type="button" className="nav-button" onClick={handleSignout}>Signout</button>}
            </div>
        </nav>
    );
}

export default Navbar;

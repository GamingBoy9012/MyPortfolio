import { useEffect, useState } from 'react';
import { apiRequest } from '../api';
import { useAuth } from '../AuthContext';

const emptyForm = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
};

function Contact() {
    const { user } = useAuth();
    const [formData, setFormData] = useState(emptyForm);
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const loadContacts = async () => {
        try {
            setContacts(await apiRequest('/api/contacts'));
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') loadContacts();
    }, [user]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            await apiRequest('/api/contacts', {
                method: 'POST',
                body: JSON.stringify({
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    contactNumber: formData.contactNumber,
                    email: formData.email,
                    message: formData.message
                })
            });

            setFormData(emptyForm);
            setMessage('Your message was sent successfully.');
            if (user?.role === 'admin') loadContacts();
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    const deleteContact = async (id) => {
        if (!window.confirm('Delete this contact message?')) return;

        try {
            await apiRequest(`/api/contacts/${id}`, { method: 'DELETE' });
            setContacts(contacts.filter((contact) => contact._id !== id));
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    return (
        <div className="page">
            <h1>Contact Me</h1>
            <div className="contact-info">
                <h2>Get In Touch</h2>
                <p>Email: abc@gmail.com</p>
                <p>Phone: xxx-xxx-xxxx</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="6" required />
                </div>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <button type="submit" className="button">Send Message</button>
            </form>

            {user?.role === 'admin' && (
                <section className="admin-section">
                    <h2>Contact Messages (Admin)</h2>
                    {contacts.length === 0 && <p>No contact messages yet.</p>}
                    <div className="admin-list">
                        {contacts.map((contact) => (
                            <article className="admin-card" key={contact._id}>
                                <h3>{contact.firstname} {contact.lastname}</h3>
                                <p>{contact.email} | {contact.contactNumber}</p>
                                <p>{contact.message}</p>
                                <button className="danger-button" onClick={() => deleteContact(contact._id)}>Delete</button>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Contact;

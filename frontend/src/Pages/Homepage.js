import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contact.css';
import Navbar from './navbar';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        // Fetch the CSRF token
        axios.get('http://127.0.0.1:8000/contact/').then((response) => {
            const csrfTokenFromCookie = document.cookie
                .split('; ')
                .find((row) => row.startsWith('csrftoken'))
                ?.split('=')[1];
            setCsrfToken(csrfTokenFromCookie || '');
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/contact/',
                formData,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                }
            );
            if (response.status === 201) {
                setResponseMessage(response.data.message);
                setFormData({ name: '', email: '', subject: '', message: '' });
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage('Failed to send your message. Please try again.');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="contact-container">
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Subject:</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Message:</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
                {responseMessage && <p className="success-message">{responseMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Contact;
 
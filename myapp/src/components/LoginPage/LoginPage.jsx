import React, { useState } from 'react';
import {
    Container,
    Paper,
    Grid,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()
    const paperStyle = {
        padding: '20px',
        maxWidth: 400,
        position: 'relative', 
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    };

    const backgroundStyle = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
        textAlign: 'center',
        width: '100%',
        fontSize: '18px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background color
        padding: '20px',
        borderRadius: '8px',
    };

    const quoteStyle = {
        marginBottom: '10px',
    };

    const quotes = [
        "The only way to do great work is to love what you do.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Your time is limited, don't waste it living someone else's life.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "The best way to predict the future is to create it.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "Believe you can and you're halfway there.",
        "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.",
        "Every strike brings me closer to the next home run.",
        "The only person you are destined to become is the person you decide to be.",
    ];

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;
        if (!email) {
            setErrors({ ...errors, email: 'Email is required' });
            return;
        }
        if (!password) {
            setErrors({ ...errors, password: 'Password is required' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8289/v1/login', { email, password });
            console.log('Login successful!', response);
            localStorage.setItem("token",response.data.token)
            navigate("/productlist")

        } catch (error) {
            console.error('Login failed:', error);
            
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <form style={formStyle} onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </form>
               
                    <div style={backgroundStyle}>
                        {quotes.map((quote, index) => (
                            <Typography key={index} variant="body1" style={quoteStyle}>
                                {quote}
                            </Typography>
                        ))}
                    </div>
                </Paper>
            </Container>
        </div>
    );
};

export default LoginPage;

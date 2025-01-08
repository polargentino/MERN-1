import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        email: '',
        question: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
        try {
            await axios.post('http://localhost:5000/api/form', { ...formData, timestamp });
            alert('Formulario enviado con éxito, gracias a Pol!!!');
            setFormData({ name: '', age: '', phone: '', email: '', question: '' });
        } catch (error) {
            alert('Error al enviar el formulario');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
               Proyecto Full stack(M.E.R.N) - Formulario de Contacto - Curso de Diseño Web - Esc.637 - 2025 - 
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre y Apellido"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Edad"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Teléfono"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Pregunta o Inquietud"
                            name="question"
                            multiline
                            rows={4}
                            value={formData.question}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" color="primary" type="submit">
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default App;

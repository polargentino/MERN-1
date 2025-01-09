const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB establecida, GRACIAS POL!!!'))
    .catch((err) => console.error(err));

// Esquema de datos
const FormSchema = new mongoose.Schema({
    name: String,
    age: Number,
    phone: String,
    email: String,
    question: String,
    timestamp: String,
});

const Form = mongoose.model('Form', FormSchema);

// Rutas
app.post('/api/form', async (req, res) => {
    try {
        const newForm = new Form(req.body);
        await newForm.save();
        res.status(201).send('Formulario guardado con éxito');
    } catch (error) {
        res.status(400).send('Error al guardar el formulario');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Ruta GET para /api/users
app.get('/api/users', (req, res) => {
    res.status(200).json({ message: 'Ruta /api/users funciona correctamente' });
});
// Ruta GET para obtener todos los formularios
app.get('/api/form', async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).send('Error al obtener los formularios');
    }
});

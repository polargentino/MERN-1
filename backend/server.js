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
    .connect(process.env.MONGO_URI)
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

// Ruta para guardar un formulario
app.post('/api/form', async (req, res) => {
    try {
        const newForm = new Form(req.body);
        await newForm.save();
        res.status(201).send('Formulario guardado con éxito');
    } catch (error) {
        res.status(400).send('Error al guardar el formulario');
    }
});

// Ruta para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
    try {
        const users = await Form.find(); // Obtén todos los usuarios del modelo `Form`
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


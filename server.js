const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

require('dotenv').config();


// Configurar Express para manejar datos de formularios (POST)
app.use(express.urlencoded({ extended: true }));



app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://Asierito:Apar1234@mangorp.8bldf0b.mongodb.net/?retryWrites=true&w=majority&appName=MangoRP', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error al conectar con MongoDB:', err));

// Esquema de usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true}, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Ruta de registro
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos.' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Crear un nuevo usuario
        const newUser = new User({ username, email, password });
        await newUser.save();
          

    res.status(201).json({ message: 'Registro exitoso.' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
    
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si los campos están completos
        if (!email || !password) {
            return res.status(400).json({ error: 'Por favor, ingresa el correo y la contraseña.' });
        }

        // Buscar el usuario en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Correo electrónico no encontrado.' });
        }

        // Verificar la contraseña (si no estás usando encriptación, puedes compararlas directamente)
        if (password !== user.password) {
            return res.status(400).json({ error: 'Contraseña incorrecta.' });
        }

        // Si todo está bien, devolver mensaje de éxito
        res.status(200).json({ message: 'Inicio de sesión exitoso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al intentar iniciar sesión.' });
    }
});



// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});


// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

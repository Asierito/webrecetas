const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Conexión a MongoDB (reemplaza con tu propia URL de conexión si usas MongoDB Atlas)
mongoose.connect('mongodb://localhost:27017/MangoRP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Esquema de la receta
const recetaSchema = new mongoose.Schema({
  nombre: String,
  ingredientes: String,
  instrucciones: String,
});

// Modelo de Receta
const Receta = mongoose.model('Receta', recetaSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para agregar una receta
app.post('/api/recetas', async (req, res) => {
  const { nombre, ingredientes, instrucciones } = req.body;
  const nuevaReceta = new Receta({ nombre, ingredientes, instrucciones });
  try {
    await nuevaReceta.save();
    res.status(201).send(nuevaReceta);
  } catch (err) {
    res.status(400).send('Error al agregar la receta');
  }
});

// Ruta para obtener todas las recetas
app.get('/api/recetas', async (req, res) => {
  try {
    const recetas = await Receta.find();
    res.json(recetas);
  } catch (err) {
    res.status(500).send('Error al obtener las recetas');
  }
});

// Ruta para eliminar una receta
app.delete('/api/recetas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Receta.findByIdAndDelete(id);
    res.send('Receta eliminada exitosamente');
  } catch (err) {
    res.status(400).send('Error al eliminar la receta');
  }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

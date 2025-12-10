import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import connectDB from './src/config/db.js'; 
import authRoutes from './src/routes/authRoutes.js'; 
import habitRoutes from './src/routes/habitRoutes.js'; 

// Cargar variables de entorno 
dotenv.config(); 

// Conectar a la Base de Datos
connectDB(); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

// ----------------------------------------------------
// RUTAS DE LA APLICACIÓN
// ----------------------------------------------------

// Rutas de Autenticación 
app.use('/api/auth', authRoutes);

// Rutas de Hábitos 
app.use('/api/habits', habitRoutes);

// Ruta de Prueba 
app.get('/', (req, res) => {
  res.send('Servidor de Habit Tracker Funcionando! 🚀');
});

// 5. Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
  console.log(`Accede a http://localhost:${PORT}`);
});
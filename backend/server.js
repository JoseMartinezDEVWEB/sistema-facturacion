import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);

//Configurar carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

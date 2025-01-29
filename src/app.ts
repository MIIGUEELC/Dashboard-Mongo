import express, { Response, Request, NextFunction } from "express";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import publicRouter from "./routes/publicRoutes";
import {connectDB} from "./database"; 

const serverless = require('serverless-http');
const PORT = process.env.PORT || 3001;

dotenv.config();

// Conectar a la base de datos MySQL
connectDB();

const app = express();

app.use(express.json());

// Habilitar CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);  // Responder a las peticiones OPTIONS (preflight requests)
    } else {
        next();
    }
});

// Rutas públicas
app.use('/api', publicRouter);

// Ruta de autenticación para generar un token
app.use('/api/auth', authRoutes);

// Rutas privadas que requieren un token válido
app.use('/api', protectedRoutes);

// Ruta raíz para dar la bienvenida
app.use('/', (req: Request, res: Response) => {
    res.json({ message: `Bienvenidos a hotel_miranda_sql` });
});

export const handler = serverless(app);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

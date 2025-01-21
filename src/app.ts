import express, { Response, Request,NextFunction } from "express";
import dotenv from 'dotenv';
import cors from 'cors';  // <-- Importamos CORS
import authRoutes from './routes/authRoutes'
import protectedRoutes from './routes/protectedRoutes'
import publicRouter from "./routes/publicRoutes";
import connectDB from "./database";

const serverless = require('serverless-http');
const PORT = process.env.PORT || 3001;
dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// Habilitar CORS
app.use(cors({  
    origin: '*',  // Permite todas las peticiones 
    credentials: true,  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
}));

// Solucionar problemas con preflight requests (CORS y Passport)
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // 
    } else {
        next();
    }
});

// Rutas de la API
app.use('/api', publicRouter);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.use('/', (req: Request, res: Response) => {
    res.json({ message: `Bienvenidos a hotel_miranda` });
});

export const handler = serverless(app);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

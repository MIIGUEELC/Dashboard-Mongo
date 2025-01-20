import express, { Response, Request } from "express";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes'
import protectedRoutes from './routes/protectedRoutes'
import publicRouter from "./routes/publicRoutes";
import connectDB from "./database";

const serverless = require('serverless-http')

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

//Rutas Publicas.
app.use('/api', publicRouter)

//Ruta Autentificación para generar un token.
app.use('/api/auth', authRoutes);

//Rutas Privadas, tener necesariamente un token valido.
app.use('/api/protected', protectedRoutes);

//Ruta raíz para dar la Bienvenida.
app.use('/', (req: Request, res: Response) => {
    res.json({ message: `Bienvenidos a hotel_miranda` })
})

export const handler = serverless(app);



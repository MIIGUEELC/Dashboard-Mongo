import express, { Response, Request,NextFunction} from "express";
import dotenv from 'dotenv';
import cors from 'cors'; 
import authRoutes from './routes/authRoutes'
import protectedRoutes from './routes/protectedRoutes'
import publicRouter from "./routes/publicRoutes";
import connectDB from "./database";

const serverless = require('serverless-http')
const PORT = process.env.PORT || 3001;
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
// Habilitar CORS

app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

//Rutas Publicas.
app.use('/api', publicRouter)

//Ruta Autentificación para generar un token.
app.use('/api/auth', authRoutes);

//Rutas Privadas, tener necesariamente un token valido.
app.use('/api', protectedRoutes);

//Ruta raíz para dar la Bienvenida.
app.use('/', (req: Request, res: Response) => {
    res.json({ message: `Bienvenidos a hotel_miranda` })
})

export const handler = serverless(app);



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

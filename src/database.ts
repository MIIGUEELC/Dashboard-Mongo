import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'Miguel',
    password: 'admin',
    database: 'hotelmiranda',
    waitForConnections: true,
    connectionLimit: 10,  
    queueLimit: 0
});

export const connectDB = async (): Promise<void> => {
    try {
        // Obtener una conexión del pool
        const connection = await pool.getConnection();
        console.log(`MySQL connected: ${connection.config.host}`);

        // Verificar la base de datos activa
        const [rows] = await connection.execute('SELECT DATABASE();');
        console.log(`Database in use: ${(rows as any)[0]['DATABASE()']}`);

        // Liberar la conexión de vuelta al pool
        connection.release();
        console.log("Connection released successfully!");

    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        process.exit(1);
    }
};





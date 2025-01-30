// import dotenv from 'dotenv';
// import mysql from 'mysql2/promise';
// import { bookingSeed, contactSeed, roomSeed, userSeed } from './seed/seed';

// dotenv.config();

// const dbConfig = {
//   host: 'localhost',  
//   user: 'Miguel',    
//   password: 'admin',   
//   database: 'hotelmiranda', 
// };

// const connectDB = async (): Promise<void> => {
//   try {
//     // Conexión con la base de datos MySQL
//     const connection = await mysql.createConnection(dbConfig);
//     console.log(`MySQL connected: ${connection.config.host}`);

//     // Insertar datos de Booking
//     await Promise.all(
//       bookingSeed.map(async (booking) => {
//         await connection.execute(
//           'INSERT INTO bookings (id, name, photo, check_in, check_out, room, requests, booking_date, price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//           [
//             booking.id,
//             booking.name,
//             booking.photo,
//             booking.check_in,
//             booking.check_out,
//             booking.room,
//             booking.requests,
//             booking.booking_date,
//             booking.price,
//             booking.status
//           ]
//         );
//       })
//     );

//     // Insertar datos de Contact
//     await Promise.all(
//       contactSeed.map(async (contact) => {
//         await connection.execute(
//           'INSERT INTO contacts (id, name, join_date, job_desc, phone, days, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//           [
//             contact.id,
//             contact.name,
//             contact.join_date,
//             contact.job_desc,
//             contact.phone,
//             contact.days,
//             contact.photo,
//             contact.status
//           ]
//         );
//       })
//     );

//     // Insertar datos de Room
//     await Promise.all(
//       roomSeed.map(async (room) => {
//         await connection.execute(
//           'INSERT INTO rooms (id, name, photo, bed_type, room_number, facilities, price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//           [
//             room.id,
//             room.name,
//             room.photo,
//             room.bed_type,
//             room.room_number,
//             room.facilities,
//             room.price,
//             room.status
//           ]
//         );
//       })
//     );

//     // Insertar datos de User
//     await Promise.all(
//       userSeed.map(async (user) => {
//         await connection.execute(
//           'INSERT INTO users (id, name, photo, order_date, check_in, check_out, room_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//           [
//             user.id,
//             user.name,
//             user.photo,
//             user.order_date,
//             user.check_in,
//             user.check_out,
//             user.room_type,
//             user.status
//           ]
//         );
//       })
//     );

//     // Cerrar la conexión después de insertar
//     await connection.end();
//     console.log("Data inserted successfully!");

//   } catch (error) {
//     console.log('Error connection to MySQL: ' + error);
//     process.exit(1);
//   }
// };

// export default connectDB;

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





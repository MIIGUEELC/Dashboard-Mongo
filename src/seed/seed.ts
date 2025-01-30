import { faker } from '@faker-js/faker';
import { pool } from "../database";  
import { RowDataPacket } from 'mysql2';

// Contador global para los números de habitación
let roomCounter = 1;

// Función para obtener un usuario aleatorio de la base de datos
const getRandomUserId = async (): Promise<string> => {
    try {
        const [rows] = await pool.execute('SELECT id FROM users LIMIT 1');  
        if ((rows as RowDataPacket[]).length > 0) {
            return (rows as RowDataPacket[])[0].id; 
        }
        throw new Error('No users found in the database');
    } catch (error) {
        throw new Error(`Error fetching random user ID: ${error}`);
    }
};

// Función para obtener una habitación aleatoria de la base de datos
const getRandomRoomId = async (): Promise<string> => {
    try {
        const [rows] = await pool.execute('SELECT id FROM rooms LIMIT 1'); 
        if ((rows as RowDataPacket[]).length > 0) {
            return (rows as RowDataPacket[])[0].id; 
        }
        throw new Error('No rooms found in the database');
    } catch (error) {
        throw new Error(`Error fetching random room ID: ${error}`);
    }
};

// Crear una reserva aleatoria
const createRandomBooking = async () => {
    const bookingId = faker.string.uuid();  
    console.log("Generated UUID for Booking:", bookingId);

    // Crear un nombre de habitación tipo "hab1", "hab2", etc.
    const roomName = `hab${roomCounter}`;
    roomCounter++;  

    // Obtener un user_id y room_id aleatorios
    const userId = await getRandomUserId(); 
    const roomId = await getRandomRoomId();  

    return {
        id: bookingId, 
        name: faker.person.firstName(), 
        photo: faker.image.avatar(),  
        check_in: faker.date.future().toISOString().split('T')[0], 
        check_out: faker.date.future().toISOString().split('T')[0], 
        room: roomId, 
        requests: faker.lorem.sentence(),
        booking_date: faker.date.past().toISOString().split('T')[0],  
        price: faker.number.int({ min: 100, max: 500 }), 
        status: faker.helpers.arrayElement(['Paid', 'Refunded', 'Pending']),  
        user_id: userId  
    };
};

// Función para agregar reservas aleatorias a la base de datos
const addBookings = async () => {
    for (let i = 0; i < 10; i++) {  // Generar 10 reservas aleatorias
        const booking = await createRandomBooking();  

        try {
            console.log("Inserting Booking with ID:", booking.id); 
            
            const [result] = await pool.execute(
                `INSERT INTO bookings (id, name, photo, check_in, check_out, room, requests, booking_date, price, status, user_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [booking.id, booking.name, booking.photo, booking.check_in, booking.check_out, booking.room, booking.requests, booking.booking_date, booking.price, booking.status, booking.user_id]
            );
            console.log(`Booking added with ID: ${booking.id}`);
        } catch (error) {
            console.error(`Error creating booking: ${error}`);
        }
    }
};

// Ejecutar el seed
addBookings();

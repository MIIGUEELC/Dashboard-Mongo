import { faker } from '@faker-js/faker';
import { addBooking } from '../services/bookingService';
import { BookingTypeID } from '../interfaces/BookingType';
import { pool } from "../database";  // Asumimos que pool ya está configurado
import { RoomType } from '../interfaces/RoomType';  // Importar la interfaz RoomType

// Crear una habitación aleatoria siguiendo la nueva interfaz RoomType
const createRandomRoom = (): RoomType => {  // Especificamos que el retorno debe ser del tipo RoomType
    return {
        name: faker.commerce.productName(),  // Nombre de la habitación
        photo: faker.image.avatar(),  // Foto de la habitación
        bed_type: faker.helpers.arrayElement(['Suite', 'Double Bed', 'Double Superior', 'Single Bed']),  // Tipo de cama
        room_number: faker.number.int({ min: 1, max: 100 }),  // Número de habitación
        facilities: faker.lorem.sentence(),  // Instalaciones o servicios disponibles
        price: faker.number.int({ min: 50, max: 500 }),  // Precio de la habitación
        status: faker.helpers.arrayElement(['Available', 'Booked'])  // Estado de la habitación
    };
};

// Crear una reserva aleatoria
const createRandomBooking = (): BookingTypeID => {
    return {
        id: faker.string.uuid(),  // ID único para la reserva
        name: faker.person.firstName(),  // Nombre del cliente
        photo: faker.image.avatar(),  // Foto del cliente
        check_in: faker.date.future().toISOString().split('T')[0],  
        check_out: faker.date.future().toISOString().split('T')[0],  
        room: faker.number.int({ min: 1, max: 100 }),  // Número de habitación (relacionado con las habitaciones creadas)
        requests: faker.lorem.sentence(),  // Solicitudes especiales para la reserva
        booking_date: faker.date.past().toISOString().split('T')[0],  
        price: faker.number.int({ min: 100, max: 500 }),  // Precio de la reserva
        status: faker.helpers.arrayElement(['Paid', 'Refunded', 'Pending'])  // Estado de la reserva
    };
};

// Función para agregar habitaciones primero
const addRooms = async () => {
    for (let i = 0; i < 10; i++) {
        const room = createRandomRoom();  // Crear habitación aleatoria
        try {
            // Insertar la habitación en la base de datos
            const [result] = await pool.execute(
                `INSERT INTO rooms (name, photo, bed_type, room_number, facilities, price, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [room.name, room.photo, room.bed_type, room.room_number, room.facilities, room.price, room.status]
            );
            console.log(`Room added with Room Number: ${room.room_number}`);
        } catch (error) {
            console.error(`Error creating room: ${error}`);
        }
    }
};

// Función para agregar reservas después de agregar las habitaciones
const seedBookings = async () => {
    await addRooms();  // Asegura que las habitaciones existan antes de agregar reservas

    const bookingSeed = faker.helpers.multiple(createRandomBooking, { count: 10 });
    
    for (const booking of bookingSeed) {
        try {
            const bookingId = await addBooking(booking);  // Agregar la reserva a la base de datos
            console.log(`Booking created with ID: ${bookingId}`);
        } catch (error) {
            console.error(`Error creating booking: ${error}`);
        }
    }
};

// Ejecutar el seed
seedBookings();

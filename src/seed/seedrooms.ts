import { faker } from '@faker-js/faker';
import { pool } from "../database";  // Utilizamos la conexión al pool que ya has definido

// Crear una habitación aleatoria
const createRandomRoom = () => {
    const roomId = faker.string.uuid();  // Generamos un UUID para la habitación
    console.log("Generated UUID for Room:", roomId);  // Verifica el UUID generado
    return {
        id: roomId,
        name: faker.commerce.productName(),  // Nombre de la habitación
        photo: faker.image.avatar(),  // Foto de la habitación
        bed_type: faker.helpers.arrayElement(['Suite', 'Double Bed', 'Double Superior', 'Single Bed']),  // Tipo de cama
        room_number: faker.number.int({ min: 1, max: 100 }),  // Número de habitación
        facilities: faker.lorem.words(5),  // Instalaciones de la habitación
        price: faker.number.int({ min: 50, max: 500 }),  // Precio de la habitación
        status: faker.helpers.arrayElement(['Available', 'Booked']),  // Estado de la habitación
    };
};

// Función para agregar habitaciones aleatorias a la base de datos
const addRooms = async () => {
    for (let i = 0; i < 10; i++) {  // Generar 10 habitaciones aleatorias
        const room = createRandomRoom();

        try {
            console.log("Inserting Room with ID:", room.id);  // Verifica la ID antes de insertar
            // Insertar la habitación en la base de datos usando pool.execute
            const [result] = await pool.execute(
                `INSERT INTO rooms (id, name, photo, bed_type, room_number, facilities, price, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [room.id, room.name, room.photo, room.bed_type, room.room_number, room.facilities, room.price, room.status]
            );
            console.log(`Room added with Room Number: ${room.room_number}`);
        } catch (error) {
            console.error(`Error creating room: ${error}`);
        }
    }
};

// Ejecutar el seed
addRooms();

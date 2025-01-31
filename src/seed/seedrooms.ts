import { faker } from '@faker-js/faker';
import { pool } from "../database";  

// Crear una habitación aleatoria
const createRandomRoom = () => {
    const roomId = faker.string.uuid(); 
    console.log("Generated UUID for Room:", roomId);  
    return {
        id: roomId,
        name: faker.commerce.productName(),  
        photo: faker.image.avatar(), 
        bed_type: faker.helpers.arrayElement(['Suite', 'Double Bed', 'Double Superior', 'Single Bed']),  
        room_number: faker.number.int({ min: 1, max: 100 }),  
        facilities: faker.lorem.words(5),  
        price: faker.number.int({ min: 50, max: 500 }),  
        status: faker.helpers.arrayElement(['Available', 'Booked']),  
    };
};

// Función para agregar habitaciones aleatorias a la base de datos
const addRooms = async () => {
    for (let i = 0; i < 10; i++) {  
        const room = createRandomRoom();

        try {
            console.log("Inserting Room with ID:", room.id);  
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





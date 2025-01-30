import { faker } from '@faker-js/faker';
import { pool } from "../database";  

// Crear un usuario aleatorio
const createRandomUser = () => {
    const userId = faker.string.uuid();  
    console.log("Generated UUID for User:", userId);  

    return {
        id: userId,  
        name: faker.name.fullName(),  
        photo: faker.image.avatar(),  
        order_date: faker.date.past().toISOString().split('T')[0],  
        check_in: faker.date.future().toISOString().split('T')[0], 
        check_out: faker.date.future().toISOString().split('T')[0], 
        room_type: faker.helpers.arrayElement(["Deluxe A-7", "Deluxe A-54", "Deluxe A-18", "Deluxe A-25"]), // Tipo de habitación aleatorio
        status: faker.helpers.arrayElement(["Pending", "Paid", "Refunded"]),  // Estado aleatorio
    };
};

// Función para agregar usuarios aleatorios a la base de datos
const addUsers = async () => {
    for (let i = 0; i < 10; i++) {  // Generar 10 usuarios aleatorios
        const user = createRandomUser();

        try {
            console.log("Inserting User with ID:", user.id);  
            // Insertar el usuario en la base de datos usando pool.execute
            const [result] = await pool.execute(
                `INSERT INTO users (id, name, photo, order_date, check_in, check_out, room_type, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [user.id, user.name, user.photo, user.order_date, user.check_in, user.check_out, user.room_type, user.status]
            );
            console.log(`User added with ID: ${user.id}`);
        } catch (error) {
            console.error(`Error creating user: ${error}`);
        }
    }
};

// Ejecutar el seed
addUsers();

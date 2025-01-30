import { faker } from '@faker-js/faker';
import { pool } from "../database";  // Utilizamos la conexión al pool que ya has definido

// Crear un usuario aleatorio
const createRandomUser = () => {
    const userId = faker.string.uuid();  // Generamos un UUID para el usuario
    console.log("Generated UUID for User:", userId);  

    return {
        id: userId,  // Asignamos el UUID generado
        name: faker.name.fullName(),  // Nombre aleatorio
        photo: faker.image.avatar(),  // Foto aleatoria
        order_date: faker.date.past().toISOString().split('T')[0],  // Fecha de la orden en formato YYYY-MM-DD
        check_in: faker.date.future().toISOString().split('T')[0],  // Fecha de check-in en formato YYYY-MM-DD
        check_out: faker.date.future().toISOString().split('T')[0],  // Fecha de check-out en formato YYYY-MM-DD
        room_type: faker.helpers.arrayElement(["Deluxe A-7", "Deluxe A-54", "Deluxe A-18", "Deluxe A-25"]), // Tipo de habitación aleatorio
        status: faker.helpers.arrayElement(["Pending", "Paid", "Refunded"]),  // Estado aleatorio
    };
};

// Función para agregar usuarios aleatorios a la base de datos
const addUsers = async () => {
    for (let i = 0; i < 10; i++) {  // Generar 10 usuarios aleatorios
        const user = createRandomUser();

        try {
            console.log("Inserting User with ID:", user.id);  // Verifica la ID antes de insertar
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

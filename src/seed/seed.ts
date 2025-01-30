// import { faker } from '@faker-js/faker';
// import { addBooking } from '../services/bookingService';
// import { BookingTypeID } from '../interfaces/BookingType';
// import { pool } from "../database";  // Asumimos que pool ya está configurado




// // Crear una reserva aleatoria
// const createRandomBooking = (): BookingTypeID => {
//     return {
//         id: faker.string.uuid(),  // ID único para la reserva
//         name: faker.person.firstName(),  // Nombre del cliente
//         photo: faker.image.avatar(),  // Foto del cliente
//         check_in: faker.date.future().toISOString().split('T')[0],  
//         check_out: faker.date.future().toISOString().split('T')[0],  
//         room: faker.number.int({ min: 1, max: 100 }),  // Número de habitación (relacionado con las habitaciones creadas)
//         requests: faker.lorem.sentence(),  // Solicitudes especiales para la reserva
//         booking_date: faker.date.past().toISOString().split('T')[0],  
//         price: faker.number.int({ min: 100, max: 500 }),  // Precio de la reserva
//         status: faker.helpers.arrayElement(['Paid', 'Refunded', 'Pending'])  // Estado de la reserva
//     };
// };

// // Función para agregar habitaciones primero


// // Función para agregar reservas después de agregar las habitaciones
// const seedBookings = async () => {
//     await addRooms();  // Asegura que las habitaciones existan antes de agregar reservas

//     const bookingSeed = faker.helpers.multiple(createRandomBooking, { count: 10 });
    
//     for (const booking of bookingSeed) {
//         try {
//             const bookingId = await addBooking(booking);  // Agregar la reserva a la base de datos
//             console.log(`Booking created with ID: ${bookingId}`);
//         } catch (error) {
//             console.error(`Error creating booking: ${error}`);
//         }
//     }
// };

// // Ejecutar el seed
// seedBookings();

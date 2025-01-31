import { BookingType, BookingTypeID } from "../interfaces/BookingType";
import { pool } from "../database";  
import { v4 as uuidv4 } from 'uuid';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Obtener todas las reservas
export const fetchAllBookings = async (): Promise<BookingTypeID[]> => {
    try {
        const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM bookings');
       
        return rows.map(row => {
            return {
                ...row,
                room: String(row.room), // Aseguramos que 'room' es un string
            } as BookingTypeID;
        });
    } catch (error) {
        throw new Error(`Error fetching bookings: ${error}`);
    }
};

// Obtener una reserva por ID
export const fetchBookingById = async (id: string): Promise<BookingTypeID | null> => {
    try {
        const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM bookings WHERE id = ?', [id]);
        return rows.length > 0
            ? { ...rows[0], room: String(rows[0].room) } as BookingTypeID  // Aseguramos que 'room' sea un string
            : null;
    } catch (error) {
        throw new Error(`Error fetching booking: ${error}`);
    }
};

// Crear una nueva reserva
export const addBooking = async (data: BookingType): Promise<string> => {
    try {
        const id = uuidv4();  // Generar un nuevo UUID
        const [result] = await pool.execute<ResultSetHeader>(
            `INSERT INTO bookings (id, name, photo, check_in, check_out, room, requests, booking_date, price, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id,
                data.name,
                data.photo,
                data.check_in,
                data.check_out,
                data.room,          
                data.requests,
                data.booking_date,
                data.price,
                data.status,
            ]
        );
        return id;  // Devuelve el ID de la reserva creada
    } catch (error) {
        throw new Error(`Error creating booking: ${error}`);
    }
};

// Actualizar una reserva por ID
export const editBooking = async (id: string, data: BookingTypeID): Promise<boolean> => {
    try {
        const [result] = await pool.execute<ResultSetHeader>(
            `UPDATE bookings SET name = ?, photo = ?, check_in = ?, check_out = ?, room = ?, requests = ?, booking_date = ?, price = ?, status = ? 
            WHERE id = ?`,
            [
                data.name,
                data.photo,
                data.check_in,
                data.check_out,
                data.room,         // 'room' sigue siendo un string aquí
                data.requests,
                data.booking_date,
                data.price,
                data.status,
                id
            ]
        );
        return result.affectedRows > 0;  // Devuelve true si la reserva fue actualizada
    } catch (error) {
        throw new Error(`Error updating booking: ${error}`);
    }
};

// Eliminar una reserva por ID
export const removeBooking = async (id: string): Promise<boolean> => {
    try {
        const [result] = await pool.execute<ResultSetHeader>(
            'DELETE FROM bookings WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;  // Devuelve true si la reserva fue eliminada
    } catch (error) {
        throw new Error(`Error deleting booking: ${error}`);
    }
};

// import { RoomTypeID, RoomType } from "../interfaces/RoomType";
// import Room from "../models/roomModel";
// import { v4 as uuidv4 } from "uuid";

// export const fetchAllRooms = async () => {
//     return await Room.find();
// }

// export const fetchRoomById = async (id: string) => {
//     return await Room.findById(id);
// }

// export const addRoom = async (data: RoomType) => {
//     const room = { ...data, id: uuidv4() };
//     const newRoom = new Room(room);
//     return await newRoom.save();
// }

// export const editRoom = async (id: string, data: RoomTypeID) => {
//     return await Room.findByIdAndUpdate(id, data, { new: true })
// }

// export const removeRoom = async (id: string) => {
//     return await Room.findByIdAndDelete(id);
// }


import { pool } from "../database"; 
import { RoomType, RoomTypeID } from "../interfaces/RoomType";

// Obtener todas las habitaciones
export const fetchAllRooms = async () => {
    const [rows] = await pool.execute("SELECT * FROM rooms");
    return rows; // Devolver directamente los resultados
};

// Obtener una habitación por su ID (ahora es un string)
export const fetchRoomById = async (id: string) => {
    const [rows]: any = await pool.execute("SELECT * FROM rooms WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
};

// Añadir una nueva habitación
export const addRoom = async (data: RoomType) => {
    const { name, photo, bed_type, room_number, facilities, price, status } = data;
    const [result]: any = await pool.execute(
        `INSERT INTO rooms (name, photo, bed_type, room_number, facilities, price, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, photo, bed_type, room_number, facilities, price, status]
    );
    // Aseguramos que el ID insertado sea un string
    return { id: String(result.insertId), ...data }; 
};

// Editar una habitación (ahora el ID es string)
export const editRoom = async (id: string, data: RoomTypeID) => {
    const { name, photo, bed_type, room_number, facilities, price, status } = data;
    await pool.execute(
        `UPDATE rooms SET name = ?, photo = ?, bed_type = ?, room_number = ?, facilities = ?, price = ?, status = ? WHERE id = ?`,
        [name, photo, bed_type, room_number, facilities, price, status, id]
    );
    return { id, name, photo, bed_type, room_number, facilities, price, status };
};

// Eliminar una habitación (ahora el ID es string)
export const removeRoom = async (id: string) => {
    await pool.execute("DELETE FROM rooms WHERE id = ?", [id]);
    return { message: `Room with ID ${id} deleted successfully` };
};


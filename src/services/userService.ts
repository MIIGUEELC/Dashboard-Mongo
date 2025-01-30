// import { UserType, UserTypeID } from "../interfaces/UserType";
// import User from "../models/userModel";
// import { v4 as uuidv4 } from "uuid";


// export const fetchAllUsers = async () => {
//     return await User.find();
// }

// export const fetchUserById = async (id: string) => {
//     return await User.findById(id);
// }

// export const addUser = async (data: UserType) => {
//     const user = { ...data, id: uuidv4() };
//     const newUser = new User(user);
//     return await newUser.save();
// }

// export const editUser = async (id: string, data: UserTypeID) => {
//     return await User.findByIdAndUpdate(id, data, { new: true });
// }

// export const removeUser = async (id: string) => {
//     return await User.findByIdAndDelete(id);
// }

import { pool } from "../database";
import { UserType, UserTypeID } from "../interfaces/UserType";

// Obtener todos los usuarios
export const fetchAllUsers = async () => {
    const [rows] = await pool.execute("SELECT * FROM users");
    return rows; // Devolver directamente los resultados
};

// Obtener un usuario por su ID
export const fetchUserById = async (id: string) => {
    const [rows]: any = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length ? rows[0] : null; // Devolver el usuario si se encuentra
};

// Añadir un nuevo usuario
export const addUser = async (data: UserType) => {
    const { name, photo, order_date, check_in, check_out, room_type, status } = data;
    const [result]: any = await pool.execute(
        `INSERT INTO users (name, photo, order_date, check_in, check_out, room_type, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, photo, order_date, check_in, check_out, room_type, status]
    );
    // Aseguramos que el ID insertado sea un string
    return { id: String(result.insertId), ...data }; 
};

// Editar un usuario (ahora el ID es string)
export const editUser = async (id: string, data: UserTypeID) => {
    const { name, photo, order_date, check_in, check_out, room_type, status } = data;
    await pool.execute(
        `UPDATE users SET name = ?, photo = ?, order_date = ?, check_in = ?, check_out = ?, room_type = ?, status = ? WHERE id = ?`,
        [name, photo, order_date, check_in, check_out, room_type, status, id]
    );
    return { id, name, photo, order_date, check_in, check_out, room_type, status }; // Retorna los datos actualizados
};

// Eliminar un usuario (ahora el ID es string)
export const removeUser = async (id: string) => {
    await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    return { message: `User with ID ${id} deleted successfully` };
};


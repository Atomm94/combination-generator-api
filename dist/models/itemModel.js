"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertItem = void 0;
const insertItem = async (conn, name) => {
    const [result] = await conn.query("INSERT INTO items (name) VALUES (?)", [name]);
    // @ts-ignore
    return result.insertId;
};
exports.insertItem = insertItem;

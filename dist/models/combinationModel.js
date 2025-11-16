"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCombination = void 0;
const insertCombination = async (conn, combination) => {
    const [result] = await conn.query("INSERT INTO combinations (combination) VALUES (?)", [JSON.stringify(combination)]);
    // @ts-ignore
    return result.insertId;
};
exports.insertCombination = insertCombination;

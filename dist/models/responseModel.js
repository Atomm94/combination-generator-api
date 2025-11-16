"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertResponse = void 0;
const insertResponse = async (conn, combinationId, response) => {
    const [result] = await conn.query("INSERT INTO responses (combination_id, response) VALUES (?, ?)", [combinationId, JSON.stringify(response)]);
    // @ts-ignore
    return result.insertId;
};
exports.insertResponse = insertResponse;

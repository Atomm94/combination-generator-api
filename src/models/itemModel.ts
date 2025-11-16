import { PoolConnection } from "mysql2/promise";

export const insertItem = async (conn: PoolConnection, name: string): Promise<number> => {
    const [result] = await conn.query(`INSERT INTO items (name) VALUES (?)`, [name]);
    // @ts-ignore
    return result.insertId;
};

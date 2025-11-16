import { PoolConnection } from "mysql2/promise";

export const insertCombination = async (
    conn: PoolConnection,
    combination: string[]
): Promise<number> => {
    const [result] = await conn.query(`INSERT INTO combinations (combination) VALUES (?)`, [JSON.stringify(combination)]);
    // @ts-ignore
    return result.insertId;
};

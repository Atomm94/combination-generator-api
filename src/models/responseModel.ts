import { PoolConnection } from "mysql2/promise";

export const insertResponse = async (
    conn: PoolConnection,
    combinationId: number,
    response: string
) => {
    await conn.query(
        `INSERT INTO responses (combination_id, response) VALUES (?, ?)`,
        [combinationId, response]
    );
};

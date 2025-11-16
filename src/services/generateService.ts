import pool from "../config/db";
import { generateItems, generateValidCombinations } from "../utils/combinationGenerator";
import * as ItemModel from "../models/itemModel";
import * as CombinationModel from "../models/combinationModel";
import * as ResponseModel from "../models/responseModel";

export class GenerateService {
    static async generate(input: number[], length: number) {
        const items: any[] = generateItems(input);
        const combinations: any[] = generateValidCombinations(items, length);

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            for (const item of items) {
                await ItemModel.insertItem(connection, item);
            }

            const combinationId = await CombinationModel.insertCombination(connection, combinations);

            await ResponseModel.insertResponse(connection, combinationId, JSON.stringify(combinations));

            await connection.commit();

            return { id: combinationId, combination: combinations };
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
}

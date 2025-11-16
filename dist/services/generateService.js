"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateService = void 0;
const db_1 = __importDefault(require("../config/db"));
const combinationGenerator_1 = require("../utils/combinationGenerator");
const itemModel_1 = require("../models/itemModel");
const combinationModel_1 = require("../models/combinationModel");
const responseModel_1 = require("../models/responseModel");
class GenerateService {
    async generate(items, length) {
        const connection = await db_1.default.getConnection();
        await connection.beginTransaction();
        try {
            const mappedItems = (0, combinationGenerator_1.mapItems)(items);
            const combinations = (0, combinationGenerator_1.generateValidCombinations)(mappedItems, length);
            // store items
            for (const item of mappedItems) {
                await (0, itemModel_1.insertItem)(connection, item);
            }
            const finalResponses = [];
            // store combinations + responses
            for (const combo of combinations) {
                const comboId = await (0, combinationModel_1.insertCombination)(connection, combo);
                const responseObj = { combination: combo };
                await (0, responseModel_1.insertResponse)(connection, comboId, responseObj);
                finalResponses.push(responseObj);
            }
            await connection.commit();
            connection.release();
            return {
                items: mappedItems,
                combinations: finalResponses
            };
        }
        catch (err) {
            await connection.rollback();
            connection.release();
            throw err;
        }
    }
}
exports.GenerateService = GenerateService;

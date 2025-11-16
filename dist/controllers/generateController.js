"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateController = void 0;
const validator_1 = require("../utils/validator");
const generateService_1 = require("../services/generateService");
const service = new generateService_1.GenerateService();
class GenerateController {
    static async generate(req, res) {
        try {
            validator_1.Validator.validateGenerateInput(req.body);
            const { items, length } = req.body;
            const result = await service.generate(items, length);
            res.json({
                status: "success",
                data: result
            });
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
exports.GenerateController = GenerateController;

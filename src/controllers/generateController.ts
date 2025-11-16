import { Request, Response } from "express";
import { GenerateService } from "../services/generateService";
import { Validator } from "../utils/validator";

export class GenerateController {
    static async generate(req: Request, res: Response) {
        try {
            Validator.validateGenerateInput(req.body);
            const { items, length } = req.body;
            const result = await GenerateService.generate(items, length);
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}

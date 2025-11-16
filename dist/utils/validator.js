"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    static validateGenerateInput(body) {
        if (!body.items || !Array.isArray(body.items)) {
            throw new Error("items must be an array");
        }
        if (!body.length || typeof body.length !== "number") {
            throw new Error("length must be a number");
        }
    }
}
exports.Validator = Validator;

export class Validator {
    static validateGenerateInput(body: any) {
        if (!body.items || !Array.isArray(body.items)) {
            throw new Error("items must be an array");
        }
        if (!body.length || typeof body.length !== "number") {
            throw new Error("length must be a number");
        }
    }
}

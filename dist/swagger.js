"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Combination Generator API",
        version: "1.0.0",
        description: "API that generates valid combinations and stores them using MySQL transactions."
    },
    servers: [
        {
            url: "http://localhost:4000",
            description: "Local server"
        }
    ],
    paths: {
        "/api/generate": {
            post: {
                summary: "Generate combinations",
                description: "Takes a list of items and desired combination length, generates valid combinations and stores them using MySQL transactions.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    items: {
                                        type: "array",
                                        items: { type: "number" }
                                    },
                                    length: { type: "number" }
                                },
                                example: {
                                    items: [1, 2, 1],
                                    length: 2
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                example: {
                                    status: "success",
                                    data: {
                                        items: ["A1", "B1", "C1"],
                                        combinations: [
                                            { combination: ["A1", "B1"] },
                                            { combination: ["A1", "C1"] },
                                            { combination: ["B1", "C1"] }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
const setupSwagger = (app) => {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
};
exports.setupSwagger = setupSwagger;

import { Express } from "express";
import swaggerUi from "swagger-ui-express";

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
                                    id: 1,
                                    combination: [
                                        ["A1", "B1"],
                                        ["A1", "C2"],
                                        ["B1", "C2"]
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export const setupSwagger = (app: Express) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

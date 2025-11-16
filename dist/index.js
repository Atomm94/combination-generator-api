"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generateRoutes_1 = __importDefault(require("./routes/generateRoutes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// swagger
(0, swagger_1.setupSwagger)(app);
app.use("/api", generateRoutes_1.default);
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

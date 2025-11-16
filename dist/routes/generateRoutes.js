"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateController_1 = require("../controllers/generateController");
const router = (0, express_1.Router)();
router.post("/generate", generateController_1.GenerateController.generate);
exports.default = router;

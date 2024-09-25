"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inscripcionController_1 = require("../controllers/inscripcionController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/listarInscripciones", inscripcionController_1.consultarInscripciones);
exports.default = router;

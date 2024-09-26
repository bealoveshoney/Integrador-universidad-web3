import { consultarInscripciones, } from "../controllers/inscripcionController"; 
import express from "express";
const router = express.Router();
import { Request, Response} from "express";


router.get("/listarInscripciones",consultarInscripciones);

export default router;
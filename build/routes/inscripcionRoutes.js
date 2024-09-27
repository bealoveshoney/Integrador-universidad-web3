"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inscripcionController_1 = require("../controllers/inscripcionController");
const router = express_1.default.Router();
router.get('/creaInscripciones', (req, res) => {
    res.render('creaInscripciones', {
        pagina: 'Crear Inscripción',
    });
});
// Listar inscripciones
router.get('/listarInscripciones', inscripcionController_1.consultarInscripciones);
// Inscribir a un estudiante en un curso
router.post('/inscribir', inscripcionController_1.inscribir); // Asegúrate de que esta ruta coincida con el formulario de inscripción
// Borrar inscripción
router.delete('/inscripcion/:curso_id/:estudiante_id', inscripcionController_1.borrarInscripcion);
// Obtener el formulario para modificar una inscripción
router.get('/modificarInscripcion/:curso_id/:estudiante_id', inscripcionController_1.modificarInscripcion);
// Actualizar inscripción
router.put('/inscripcion/:curso_id/:estudiante_id', inscripcionController_1.actualizarInscripcion);
router.get('/creaInscripciones', (req, res) => {
    res.render('creaInscripciones', {
        pagina: 'Crear Inscripción',
    });
});
exports.default = router;

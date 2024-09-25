"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router(); //el route puede manejar las rutas
//const ProfesoresController = require("../controller/profesoresController");
//const profesoresController = require("../controller/profesoresController");
const cursosController_1 = require("../controllers/cursosController");
router.get('/listarCursos', cursosController_1.consultarCursos);
//insertar
router.get('/crearCurso', (req, res) => {
    res.render('crearCursos', {
        pagina: 'Crear Curso',
    });
});
router.post('/', cursosController_1.insertar);
router.route('/:id')
    .delete(cursosController_1.borrar)
    .put(cursosController_1.modificar)
    .get(cursosController_1.consultarUno);
//module.exports = route; //const manejador de rutas
exports.default = router;

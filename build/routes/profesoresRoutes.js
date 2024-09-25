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
const profesoresController_1 = require("../controllers/profesoresController");
router.get('/listarProfesores', profesoresController_1.consultar);
//vista para insertar
router.get('/crearProfesores', (req, res) => {
    res.render('crearProfesores', {
        pagina: 'Crear Profesor',
    });
});
// la ruta donde se hace el post
router.post('/', profesoresController_1.insertar);
router.route('/:id')
    .delete(profesoresController_1.borrar)
    // .put(modificar)
    .get(profesoresController_1.consultarUno);
//module.exports = route; //const manejador de rutas
exports.default = router;

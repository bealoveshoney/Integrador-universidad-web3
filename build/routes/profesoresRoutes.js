"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
router.put('/profesores/modificarProfesor/:id', (req, res) => {
    res.render('crearProfesores', {
        pagina: 'Crear Profesor',
    });
});
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
    .put(profesoresController_1.modificar)
    .get(profesoresController_1.consultarUno);
router.get('/listarProfesores', profesoresController_1.consultar);
// Obtener el formulario para modificar un profesor
router.get('/modificarProfesor/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesor = yield (0, profesoresController_1.consultarUno)(req, res); // Asegúrate de pasar solo el ID
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }
        res.render('modificarEstudiante', {
            profesor // Asegúrate de que los datos se pasen correctamente a la vista
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
}));
// Modificar un profesor
router.put('/modificarProfesor/:id', profesoresController_1.modificar);
// Crear un nuevo profesor (formulario)
router.get('/crearProfesores', (req, res) => {
    res.render('crearProfesores', { pagina: 'Crear Profesor' });
});
// Insertar un nuevo profesor
router.post('/', profesoresController_1.insertar);
// Consultar y borrar un profesor usando la misma ruta
router.route('/:id')
    .delete(profesoresController_1.borrar)
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profesor = yield (0, profesoresController_1.consultarUno)(req, res);
    if (!profesor) {
        return res.status(404).send('Profesor no encontrado');
    }
    res.json(profesor); // O puedes renderizar una vista si prefieres
}));
exports.default = router;

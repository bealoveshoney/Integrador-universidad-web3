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
const express_1 = __importDefault(require("express"));
const profesoresController_1 = require("../controllers/profesoresController");
const router = express_1.default.Router();
// Listar todos los profesores
router.get('/listarProfesores', profesoresController_1.consultar);
// Obtener el formulario para crear un nuevo profesor
router.get('/crearProfesores', (req, res) => {
    res.render('crearProfesores', {
        pagina: 'Crear Profesor',
    });
});
// Insertar un nuevo profesor
router.post('/crearProfesores', profesoresController_1.insertar); // Asegúrate de que esta ruta coincida con el formulario
// Obtener el formulario para modificar un profesor
router.get('/modificarProfesor/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesor = yield (0, profesoresController_1.consultarUno)(req, res);
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }
        res.render('modificarProfesor', {
            profesor //objetos q tiene los datos disponibles en la vista
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
}));
// Modificar un profesor
// Consultar y borrar un profesor usando la misma ruta
router.route('/:id')
    .put(profesoresController_1.modificar)
    .get(profesoresController_1.consultarUno) // Consultar un profesor
    .delete(profesoresController_1.borrar); // Borrar un profesor
// Esta sección parece redundante y no es necesaria si ya estás usando los controladores
// Elimina la lógica repetida de modificación
// Si necesitas lógica personalizada, puedes integrarla dentro de los controladores ya definidos
router.put('/modificarProfesor/:id', profesoresController_1.modificar);
exports.default = router;

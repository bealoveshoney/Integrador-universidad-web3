import express from "express";
import { consultar, insertar, consultarUno, borrar, modificar } from '../controllers/profesoresController';
import { Profesor } from "../models/profesorModel";

const router = express.Router();

// Listar todos los profesores
router.get('/listarProfesores', consultar);

// Obtener el formulario para crear un nuevo profesor
router.get('/crearProfesores', (req, res) => {
    res.render('crearProfesores', {
        pagina: 'Crear Profesor',
    });
});

// Insertar un nuevo profesor
router.post('/crearProfesores', insertar); // Asegúrate de que esta ruta coincida con el formulario

// Obtener el formulario para modificar un profesor
router.get('/modificarProfesor/:id', async (req, res) => {
    try {
        const profesor = await consultarUno(req, res); 
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }
        res.render('modificarProfesor', {
            profesor //objetos q tiene los datos disponibles en la vista
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});

// Modificar un profesor


// Consultar y borrar un profesor usando la misma ruta
router.route('/:id')
    .put(modificar)
    .get(consultarUno) // Consultar un profesor
    .delete(borrar);   // Borrar un profesor

// Esta sección parece redundante y no es necesaria si ya estás usando los controladores
// Elimina la lógica repetida de modificación
// Si necesitas lógica personalizada, puedes integrarla dentro de los controladores ya definidos
router.put('/modificarProfesor/:id', modificar);
export default router;

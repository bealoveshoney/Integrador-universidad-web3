import express from "express";
import {
    inscribir,
    borrarInscripcion,
    consultarInscripciones,
    modificarInscripcion,
    actualizarInscripcion
} from '../controllers/inscripcionController';
import { Profesor } from '../models/profesorModel'; 
import { CursoEstudiante } from '../models/inscripcionModel'; 
import { Curso } from '../models/cursoModel';

const router = express.Router();

router.get('/creaInscripciones', (req, res) => {
    res.render('creaInscripciones', {
        pagina: 'Crear Inscripción',
    });
});

// Listar inscripciones
router.get('/listarInscripciones', consultarInscripciones);

// Inscribir a un estudiante en un curso
router.post('/inscribir', inscribir); // Asegúrate de que esta ruta coincida con el formulario de inscripción

// Borrar inscripción
router.delete('/inscripcion/:curso_id/:estudiante_id', borrarInscripcion);

// Obtener el formulario para modificar una inscripción
router.get('/modificarInscripcion/:curso_id/:estudiante_id', modificarInscripcion);

// Actualizar inscripción
router.put('/inscripcion/:curso_id/:estudiante_id', actualizarInscripcion);
router.get('/creaInscripciones', (req, res) => {
    res.render('creaInscripciones', {
        pagina: 'Crear Inscripción',
    });
});


export default router;
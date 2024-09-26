"use strict";
//const db = require("../database/conexion");
//const {json}= require("express"); //para que las respuestas enviadas desde el servidor son en formato json
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarUno = exports.buscarCursos = exports.consultarCursos = exports.modificar = exports.borrar = exports.insertar = void 0;
const cursoModel_1 = require("../models/cursoModel");
const profesorModel_1 = require("../models/profesorModel");
const conexion_1 = require("../db/conexion");
const express_validator_1 = require("express-validator");
const inscripcionModel_1 = require("../models/inscripcionModel");
let cursos;
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validación agregada
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        res.status(400).json({ errores: errores.array() });
    }
    const { nombre, descripcion, profesor_id } = req.body;
    try {
        yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const cursoRepository = transactionalEntityManager.getRepository(cursoModel_1.Curso);
            const profesorRepository = transactionalEntityManager.getRepository(profesorModel_1.Profesor);
            // Verificar si el profesor existe
            const profesor = yield profesorRepository.findOneBy({ id: profesor_id });
            if (!profesor) {
                throw new Error('El profesor especificado no existe.');
            }
            // Verificar si el curso ya existe
            const existeCurso = yield cursoRepository.findOne({
                where: { nombre }
            });
            if (existeCurso) {
                throw new Error('El curso ya existe.');
            }
            // Crear y guardar el nuevo curso
            const nuevoCurso = cursoRepository.create({ nombre, descripcion, profesor });
            yield cursoRepository.save(nuevoCurso);
        }));
        // Devolver una respuesta JSON
        const cursos = yield conexion_1.AppDataSource.getRepository(cursoModel_1.Curso).find();
        res.render('listarCursos', {
            pagina: 'Lista de Cursos',
            cursos
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ mensaje: err.message });
        }
        else {
            res.status(500).json({ mensaje: 'Error desconocido' });
        }
    }
});
exports.insertar = insertar;
const borrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        //console.log(`ID recibido para eliminar: ${id}`); 
        yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const inscripcionRepository = transactionalEntityManager.getRepository(inscripcionModel_1.CursoEstudiante);
            const estudianteRepository = transactionalEntityManager.getRepository(cursoModel_1.Curso);
            const cursosRelacionados = yield inscripcionRepository.count({ where: { curso: { id: Number(id) } } });
            if (cursosRelacionados > 0) {
                throw new Error('Curso asociado a estudiantes, no se puede eliminar');
            }
            const deleteResult = yield estudianteRepository.delete(id);
            if (deleteResult.affected === 1) {
                return res.json({ mensaje: 'Curso eliminado' });
            }
            else {
                throw new Error('Curso no encontrado');
            }
        }));
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ mensaje: err.message });
        }
        else {
            res.status(400).json({ mensaje: 'Error' });
        }
    }
});
exports.borrar = borrar;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, descripcion, profesor_id } = req.body;
    try {
        const cursoRepository = conexion_1.AppDataSource.getRepository(cursoModel_1.Curso);
        const curso = yield cursoRepository.findOne({ where: { id: parseInt(id) } });
        const profesorRepository = conexion_1.AppDataSource.getRepository(profesorModel_1.Profesor);
        const profesor = yield profesorRepository.findOne({ where: { id: parseInt(id) } });
        if (!curso) {
            return res.status(404).send('Curso no encontrado');
        }
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }
        cursoRepository.merge(curso, { nombre, descripcion });
        yield cursoRepository.save(curso);
        return res.redirect('/cursos/listarCursos');
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.modificar = modificar;
const consultarCursos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursoRepository = conexion_1.AppDataSource.getRepository(cursoModel_1.Curso);
        const cursos = yield cursoRepository.find(); // Recupera todos los cursos
        res.render('listarCursos', {
            pagina: 'Lista de Cursos', // Nombre de la página
            cursos // Pasar los cursos a la vista
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message); // Envía un error 500 en caso de falla
        }
        else {
            res.status(500).send('Error desconocido'); // Envía un error 500 en caso de error desconocido
        }
    }
});
exports.consultarCursos = consultarCursos;
const buscarCursos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursoRepository = conexion_1.AppDataSource.getRepository(cursoModel_1.Curso);
        const cursos = yield cursoRepository.find();
        if (cursos) {
            return cursos;
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ mensaje: err.message });
        }
        else {
            res.status(400).json({ mensaje: 'Error' });
        }
    }
});
exports.buscarCursos = buscarCursos;
const consultarUno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("consultar uno");
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.consultarUno = consultarUno;
//module.exports = new ProfesoresController();
//export default new ProfesoresController();

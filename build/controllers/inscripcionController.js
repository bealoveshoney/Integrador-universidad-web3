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
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarInscripciones = exports.borrarInscripcion = exports.inscribir = void 0;
const conexion_1 = require("../db/conexion");
const inscripcionModel_1 = require("../models/inscripcionModel");
const estudianteModel_1 = require("../models/estudianteModel");
const cursoModel_1 = require("../models/cursoModel");
//let cursoEstudiante: CursoEstudiante[];
//let estudiantes: Estudiante[];
//let cursos: Curso[];
const inscribir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estudiante_id, curso_id, fecha } = req.body;
    try {
        const estudiante = yield conexion_1.AppDataSource.getRepository(estudianteModel_1.Estudiante).findOne({ where: { id: estudiante_id } });
        const curso = yield conexion_1.AppDataSource.getRepository(cursoModel_1.Curso).findOne({ where: { id: curso_id } });
        if (!estudiante || !curso) {
            res.status(400).json({ mensaje: 'Estudiante o curso no encontrado.' });
            return;
        }
        const inscripcion = new inscripcionModel_1.CursoEstudiante();
        inscripcion.estudiante = estudiante;
        inscripcion.curso = curso;
        inscripcion.fecha = fecha;
        yield conexion_1.AppDataSource.getRepository(inscripcionModel_1.CursoEstudiante).save(inscripcion);
        res.redirect('/inscripciones/listarInscripciones');
    }
    catch (err) {
        console.error('Error al inscribir al estudiante:', err);
        res.status(500).send('Error al inscribir al estudiante');
    }
});
exports.inscribir = inscribir;
const borrarInscripcion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const inscripcionRepository = transactionalEntityManager.getRepository(inscripcionModel_1.CursoEstudiante);
            const resultado = yield inscripcionRepository.delete({ curso_id: parseInt(req.params.curso_id), estudiante_id: parseInt(req.params.estudiante_id) });
            if (resultado.affected == 1) {
                return res.json({ mensaje: 'Inscripción eliminada' });
            }
            else {
                return res.json({ mensaje: 'No se ha podido eliminar la inscripción ' });
            }
        }));
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.borrarInscripcion = borrarInscripcion;
const consultarInscripciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursoEstudianteRepository = conexion_1.AppDataSource.getRepository(inscripcionModel_1.CursoEstudiante);
        const estudiantesRepository = conexion_1.AppDataSource.getRepository(estudianteModel_1.Estudiante);
        const cursosRepository = conexion_1.AppDataSource.getRepository(cursoModel_1.Curso);
        const inscripciones = (yield cursoEstudianteRepository.find({ relations: ['estudiante', 'curso'] })) || [];
        const estudiantes = (yield estudiantesRepository.find()) || [];
        const cursos = (yield cursosRepository.find()) || [];
        res.render('listarInscripciones', {
            pagina: 'Lista de Inscripciones',
            inscripciones,
            estudiantes,
            cursos
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.consultarInscripciones = consultarInscripciones;

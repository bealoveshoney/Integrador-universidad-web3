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
exports.consultarInscripciones = void 0;
const conexion_1 = require("../db/conexion");
const inscripcionModel_1 = require("../models/inscripcionModel");
const estudianteModel_1 = require("../models/estudianteModel");
const cursoModel_1 = require("../models/cursoModel");
//let cursoEstudiante: CursoEstudiante[];
//let estudiantes: Estudiante[];
//let cursos: Curso[];
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

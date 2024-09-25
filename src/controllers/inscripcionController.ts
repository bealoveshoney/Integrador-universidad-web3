import { Request,Response } from "express";
import { AppDataSource } from '../db/conexion';
import { CursoEstudiante } from '../models/inscripcionModel';
import { Estudiante } from '../models/estudianteModel';
import { Curso } from '../models/cursoModel'

//let cursoEstudiante: CursoEstudiante[];
//let estudiantes: Estudiante[];
//let cursos: Curso[];


export const consultarInscripciones = async (req: Request, res: Response) => {
    try {
        const cursoEstudianteRepository = AppDataSource.getRepository(CursoEstudiante);
        const estudiantesRepository = AppDataSource.getRepository(Estudiante);
        const cursosRepository = AppDataSource.getRepository(Curso);
        
        const inscripciones = await cursoEstudianteRepository.find({ relations: ['estudiante', 'curso'] }) || [];
        const estudiantes = await estudiantesRepository.find() || [];
        const cursos = await cursosRepository.find() || [];
        
        res.render('listarInscripciones', {
            pagina: 'Lista de Inscripciones',
            inscripciones,
            estudiantes,
            cursos
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
};

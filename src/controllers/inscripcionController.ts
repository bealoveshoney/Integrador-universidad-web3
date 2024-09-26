import { Request,Response } from "express";
import { AppDataSource } from '../db/conexion';
import { CursoEstudiante } from '../models/inscripcionModel';
import { Estudiante } from '../models/estudianteModel';
import { Curso } from '../models/cursoModel'

//let cursoEstudiante: CursoEstudiante[];
//let estudiantes: Estudiante[];
//let cursos: Curso[];
export const inscribir = async (req: Request, res: Response): Promise<void> => {
    const { estudiante_id, curso_id, fecha } = req.body;

    try {
        const estudiante = await AppDataSource.getRepository(Estudiante).findOne({ where: { id: estudiante_id } });
        const curso = await AppDataSource.getRepository(Curso).findOne({ where: { id: curso_id } });

        if (!estudiante || !curso) {
            res.status(400).json({ mensaje: 'Estudiante o curso no encontrado.' });
            return;
        }

        const inscripcion = new CursoEstudiante();
        inscripcion.estudiante = estudiante;
        inscripcion.curso = curso;
        inscripcion.fecha = fecha;

        await AppDataSource.getRepository(CursoEstudiante).save(inscripcion);
        res.redirect('/inscripciones/listarInscripciones');
    } catch (err) {
        console.error('Error al inscribir al estudiante:', err);
        res.status(500).send('Error al inscribir al estudiante');
    }
};



export const borrarInscripcion = async (req:Request,res:Response):Promise<void>=>{
    try{
        await AppDataSource.transaction(async transactionalEntityManager=>{
            const inscripcionRepository = transactionalEntityManager.getRepository(CursoEstudiante);
            const resultado = await inscripcionRepository.delete({curso_id:parseInt(req.params.curso_id),estudiante_id:parseInt(req.params.estudiante_id)});
            if(resultado.affected == 1){
                return res.json({mensaje: 'Inscripción eliminada'});
            } else {
                return res.json({mensaje: 'No se ha podido eliminar la inscripción '});
            }
        });
    }catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
}

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

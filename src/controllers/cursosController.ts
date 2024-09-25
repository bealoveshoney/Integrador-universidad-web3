//const db = require("../database/conexion");
//const {json}= require("express"); //para que las respuestas enviadas desde el servidor son en formato json


import { Request,Response, NextFunction } from "express";
import { Curso } from "../models/cursoModel";
import { Profesor } from "../models/profesorModel";
import { AppDataSource } from "../db/conexion";
import { check, validationResult } from "express-validator";
import { CursoEstudiante } from '../models/inscripcionModel';




export const insertar = async (req: Request, res: Response): Promise<void> => {
  
  // Validación agregada
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
     res.status(400).json({ errores: errores.array() });
  }
  
  const { nombre, descripcion, profesor_id } = req.body;

  try {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const cursoRepository = transactionalEntityManager.getRepository(Curso);
      const profesorRepository = transactionalEntityManager.getRepository(Profesor);

      // Verificar si el profesor existe
      const profesor = await profesorRepository.findOneBy({ id: profesor_id });
      if (!profesor) {
        throw new Error('El profesor especificado no existe.');
      }

      // Verificar si el curso ya existe
      const existeCurso = await cursoRepository.findOne({
        where: { nombre }
      });

      if (existeCurso) {
        throw new Error('El curso ya existe.');
      }

      // Crear y guardar el nuevo curso
      const nuevoCurso = cursoRepository.create({ nombre, descripcion, profesor });
      await cursoRepository.save(nuevoCurso);
    });

    // Devolver una respuesta JSON
    const cursos = await AppDataSource.getRepository(Curso).find();
    res.render('listarCursos', {
      pagina: 'Lista de Cursos',
      cursos
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ mensaje: err.message });
    } else {
      res.status(500).json({ mensaje: 'Error desconocido' });
    }
  }
};
 

         


    export const borrar = async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      try {
          //console.log(`ID recibido para eliminar: ${id}`); 
          await AppDataSource.transaction(async transactionalEntityManager => {
              const inscripcionRepository = transactionalEntityManager.getRepository(CursoEstudiante);
              const estudianteRepository = transactionalEntityManager.getRepository(Curso);
  
              const cursosRelacionados = await inscripcionRepository.count({ where: { curso: { id: Number(id) } } });
              if (cursosRelacionados > 0) {
                  throw new Error('Curso asociado a estudiantes, no se puede eliminar');
              }
              const deleteResult = await estudianteRepository.delete(id);
  
              if (deleteResult.affected === 1) {
                  return res.json({ mensaje: 'Curso eliminado' }); 
              } else {
                  throw new Error('Curso no encontrado');
              }
          });
      } catch (err: unknown) {
          if (err instanceof Error) {
              res.status(400).json({ mensaje: err.message });
          } else {
              res.status(400).json({ mensaje: 'Error' });
          }
      }
  };  
             
      

    export const modificar= async (req:Request,res:Response) =>{
  
    try {
          res.send("modificar");
                
          } catch (err) {
            if(err instanceof Error){
            res.status(500).send(err.message); 
          }}
    }

 

      export const consultarCursos = async (req: Request, res: Response): Promise<void> => {
        try {
          const cursoRepository = AppDataSource.getRepository(Curso);
          const cursos = await cursoRepository.find(); // Recupera todos los cursos
          res.render('listarCursos', { // Nombre del archivo Pug para listar cursos
            pagina: 'Lista de Cursos', // Nombre de la página
            cursos // Pasar los cursos a la vista
          });
        } catch (err: unknown) {
          if (err instanceof Error) {
            res.status(500).send(err.message); // Envía un error 500 en caso de falla
          } else {
            res.status(500).send('Error desconocido'); // Envía un error 500 en caso de error desconocido
          }
        }
      };

      export const buscarCursos = async (req:Request,res:Response):Promise<Curso[] |null |undefined>=>{
        try{
          const cursoRepository = AppDataSource.getRepository(Curso);
            const cursos = await cursoRepository.find();
            if(cursos){
                return cursos;
            } else {
                return null;
            }
        }catch(err:unknown){
          if (err instanceof Error) {
            res.status(400).json({ mensaje: err.message });
        } else {
            res.status(400).json({ mensaje: 'Error' });
        }
        }
    }

     

    export const consultarUno= async (req:Request,res:Response) =>{

    try {
      
      res.send("consultar uno");
      
    } catch (err) {
      if(err instanceof Error){
      res.status(500).send(err.message);
    }}
    }









//module.exports = new ProfesoresController();
//export default new ProfesoresController();

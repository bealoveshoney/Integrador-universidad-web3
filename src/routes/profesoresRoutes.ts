//const express = require("express");
import express from "express";
const router = express.Router(); //el route puede manejar las rutas
//const ProfesoresController = require("../controller/profesoresController");
//const profesoresController = require("../controller/profesoresController");
import { consultar, insertar, consultarUno, borrar, modificar} from '../controllers/profesoresController';
import { Profesor } from "../models/profesorModel";



router.get('/listarProfesores',consultar);

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
  router.post('/',insertar);


router.route('/:id')
       .delete(borrar)
      .put(modificar)
      .get(consultarUno);

      router.get('/listarProfesores', consultar);

      // Obtener el formulario para modificar un profesor
      router.get('/modificarProfesor/:id', async (req, res) => {
        try {
            const profesor = await consultarUno(req, res); // Asegúrate de pasar solo el ID
            if (!profesor) {
                return res.status(404).send('Profesor no encontrado');
            }
            res.render('modificarEstudiante', { // Asegúrate de que el nombre de la vista sea correcto
                profesor // Asegúrate de que los datos se pasen correctamente a la vista
            });
          } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    });
    
    // Modificar un profesor
    router.put('/modificarProfesor/:id', modificar);
    
    // Crear un nuevo profesor (formulario)
    router.get('/crearProfesores', (req, res) => {
        res.render('crearProfesores', { pagina: 'Crear Profesor' });
    });
    
    // Insertar un nuevo profesor
    router.post('/', insertar);
    
    // Consultar y borrar un profesor usando la misma ruta
    router.route('/:id')
        .delete(borrar)
        .get(async (req, res) => {
            const profesor = await consultarUno(req, res);
            if (!profesor) {
                return res.status(404).send('Profesor no encontrado');
            }
            res.json(profesor); // O puedes renderizar una vista si prefieres
        });
      
      export default router;
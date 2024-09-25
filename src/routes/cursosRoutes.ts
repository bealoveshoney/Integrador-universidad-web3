//const express = require("express");
import express from "express";
const router = express.Router(); //el route puede manejar las rutas
//const ProfesoresController = require("../controller/profesoresController");
//const profesoresController = require("../controller/profesoresController");
import { consultarCursos, insertar, borrar, modificar, consultarUno} from '../controllers/cursosController';



router.get('/listarCursos',consultarCursos);


//insertar
router.get('/crearCurso', (req, res) => {
      res.render('crearCursos', {
          pagina: 'Crear Curso',
      });
  });

router.post('/' , insertar);


router.route('/:id')
      .delete(borrar)
      .put(modificar)
      .get(consultarUno);

//module.exports = route; //const manejador de rutas
export default router;
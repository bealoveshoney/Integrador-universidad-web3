//const express = require("express");
import express from "express";
const router = express.Router(); //el route puede manejar las rutas
//const ProfesoresController = require("../controller/profesoresController");
//const profesoresController = require("../controller/profesoresController");
import { consultar, insertar, consultarUno, borrar} from '../controllers/profesoresController';



router.get('/listarProfesores',consultar);


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
     // .put(modificar)
      .get(consultarUno);

//module.exports = route; //const manejador de rutas
export default router;
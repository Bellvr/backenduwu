const router = require("express").Router();
const db = require('../../conexion');

router.get("/", function(req, rest, next){
    //req: lo recibido(respuesta), rest: se devuelve(envia/responde), next: busca siguiente coincidencia

   const { busqueda } = req.query;
   const busquedaParcial = `%{busqueda}%`; 
//aca no va la comprobacion
   db.query("SELECT * FROM alumnos WHERE apellidos like ?", [busqueda])
   .then(([rows, fields])=>{
    rest.send(rows);
   })
   .catch((error)=>{
    console.error(error);
    rest.status(500).send('ocurrio un error');
   })
})

module.exports = router;
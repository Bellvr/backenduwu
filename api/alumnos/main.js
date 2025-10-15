const router = require("express").Router();
const db = require('../../conexion');
const fileUpload = require("express-fileupload");
const path = require("path");

const directorio = path.join(__dirname, "..","..", "archivos");

router.get("/", function(req, rest, next){
    //req: lo recibido(respuesta), rest: se devuelve(envia/responde), next: busca siguiente coincidencia

   const { busqueda } = req.query;

   const user = req.user;
   console.log({user});

   let sql = "SELECT * FROM alumnos";
   let busquedaParcial = busqueda
   if (busqueda){
      sql +=" WHERE apellidos LIKE ?"
      busquedaParcial = `%${busqueda}%`;
   }
//aca no va la comprobacion
   db.query(sql, [busquedaParcial])
   .then(([rows, fields])=>{
    rest.send(rows);
   })
   .catch((error)=>{
    console.error(error);
    rest.status(500).send('ocurrio un error');
   })
})

   router.post("/", fileUpload(),function(req,res,next){
      //const {documento, apellidos, nombres} = req.body;

      if(!req.files || !req.files.archivo){
         console.log("No hay archivos");
         return res.status(403).send("NO hay archivo");
      }
         const {archivo} = req.files;
         const filepath = path.join(directorio, archivo.name);
         archivo.mv(filepath, function(error){
            if(error){
               console.error(error);
               return res.status(500).send("Ocurrio un error");
            }
               res.status(201).send("Guardado");
         })
      

      

     /* let sql = "INSERT INTO alumnos (documento, apellidos, nombres) ";
      sql += "VALUES (?, ?, ?)";

      db.query(sql, [documento, apellidos, nombres])
      .then(()=>{
         res.status(201).send("guardado uwu");
      })
      .catch((error)=>{
         console.error(error);
         res.status(500).send("Ocurrio un error en post");
      })*/
   })

   //post archivos y get

   router.delete("/:alumno_id", function(req, res, next){
      const {alumno_id} = req.params;
      const sql = "DELETE FROM alumnos WHERE id = ?";

       db.query(sql, [alumno_id])
      .then(()=>{
         res.status(201).send("eliminado");
      })
      .catch((error)=>{
         console.error(error);
         res.status(500).send("Ocurrio un error en delete");
      })
   })

    router.put("/:alumno_id", function(req, res, next){

      const {alumno_id} = req.params;
       const {documento, apellidos, nombres} = req.body;
      const sql = "UPDATE alumnos SET documento = ?, apellidos = ?, nombres = ? WHERE id = ?";

       db.query(sql, [ documento, nombres, apellidos, alumno_id])
      .then(()=>{
         res.status(200).send("modificado");
      })
      .catch((error)=>{
         console.error(error);
         res.status(500).send("Ocurrio un error en update");
      })
   })

module.exports = router;
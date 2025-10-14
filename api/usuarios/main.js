//campos user id, username, userpass(70)

const router = require("express").Router();
const db = require('../../conexion');

const loginRouter = require("./login");

const {hashPass} = require('@damianegreco/hashpass');

router.use("/login", loginRouter);

router.get("/", function(req, rest, next){
   
   const { busqueda } = req.query;
   let sql = "SELECT * FROM usuarios";
   let busquedaParcial = busqueda
   if (busqueda){
      sql +=" WHERE username LIKE ?"
      busquedaParcial = `%${busqueda}%`;
   }
//aca no va la comprobacion
   db.query(sql, [busquedaParcial])
   .then(([rows, fields])=>{
    rest.send(rows);
   })
   .catch((error)=>{
    console.error(error);
    rest.status(500).send('ocurrio un error get user');
   })
})

 router.post("/", function(req,res,next){
      const {username, userpass} = req.body;
      let sql = "INSERT INTO usuarios (username, userpass) ";
      sql += "VALUES (?, ?)";

      const passHash = hashPass(userpass);

      db.query(sql, [username, passHash])
      .then(()=>{
         res.status(201).send("user guardado");
      })
      .catch((error)=>{
         console.error(error);
         res.status(500).send("Ocurrio un error en post");
      })
   })

   
 router.delete("/:usuario_id", function(req, res, next){
      const {usuario_id} = req.params;
      const sql = "DELETE FROM usuarios WHERE id = ?";

       db.query(sql, [usuario_id])
      .then(()=>{
         res.status(201).send("user eliminado");
      })
      .catch((error)=>{
         console.error(error);
         res.status(500).send("Ocurrio un error en delete");
      })
   })

    router.put("/:usuario_id", function(req, res, next){

      const {usuario_id} = req.params;
       const {username, userpass} = req.body;
      const sql = "UPDATE usuarios SET username = ?, userpass = ? WHERE id = ?";

       db.query(sql, [ username, userpass, usuario_id])
      .then(()=>{
         res.status(200).send("user modificado");
      })
      .catch((error)=>{
         console.error(error);
         res.status(500).send("Ocurrio un error en update");
      })
   })


module.exports = router;
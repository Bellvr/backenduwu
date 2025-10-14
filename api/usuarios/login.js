const router = require('express').Router();


const { verificarPass, generarToken } = require('@damianegreco/hashpass');
const {TOKEN_SECRET} = process.env;

const db = require('../../conexion');
router.post('/', function(req, res, next){
    const{user, pass} = req.body;
    let sql = "SELECT id, username, userpass FROM usuarios ";
    sql+= "WHERE username = ?";

    db.query(sql, [user])
    .then(([usuarios]) => {
      if(usuarios && usuarios.length === 1){
        const usuario = usuarios[0];
        if(verificarPass(pass, usuario.userpass)){
          //EL USER Y PASS SON CORRECTOS

            const token = generarToken(TOKEN_SECRET, 4, { username: usuario.username })

            res.status(200).json({status:"ok", token});
        }else{
        console.log("contrasena no encontrado");
        res.status(401).send("Usuario y/o contrasena incorrecto");
        }
      } else{
        console.log("usuario no encontrado");
        res.status(401).send("Usuario y/o contrasena incorrecto");
      }
    })
    .catch((error) =>{
        console.error(error);
        res.status(500).send("Ocurrio un error");
    })
})
module.exports = router;
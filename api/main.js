const router = require("express").Router();

const alumnosRouter = require("./alumnos/main");

//validaruser va a ser nuestro middleware

function validarUsuario(req, res, next){
    console.log("Paso por el middleware");
    next();
}
router.use("/alumnos", validarUsuario, alumnosRouter);

router.get('/', function(req, res, next){
    res.send("archivo principal de la api");
})

module.exports = router;
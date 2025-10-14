const router = require("express").Router();

const middleware = require('./middleware');

const alumnosRouter = require("./alumnos/main");
const usuariosRouter = require("./usuarios/main");

//validaruser va a ser nuestro middleware

router.use("/alumnos", middleware, alumnosRouter);
router.use("/usuarios" , usuariosRouter);

//endpoint
router.get('/', function(req, res, next){
    res.send("archivo principal de la api");
})

module.exports = router;
const {verificarToken} = require('@damianegreco/hashpass');

const {TOKEN_SECRET} = process.env;

function middleware (req, res, next){
const token = req.headers.authorization;

console.log({token});

const verificacion = verificarToken(token, TOKEN_SECRET);
console.log({verificacion});

if(verificacion?.data){
    req.user = verificacion.data;
    next();
} else {
    res.status(401).send("Sin autorizacion");
}
}

module.exports = middleware;
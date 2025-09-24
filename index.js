const express = require("express");
require('dotenv').config();

const {PORT}= process.env;

const app = express();

app.get("/", function(req, res, next){
    /*
    req.header
    req.params
    req.query
    req.body(solo post,put)
    */
    //res.send('prueba');
    //req.json

   // const {ejemplo}=req.params;
    const {ejemplo}= req.query
    console.log({ejemplo});
    next();
})
app.get("/", function(req, res, next){
    res.send('OK');

})

app.listen(PORT, function(error){
    if(error){
        console.error(error);
        process.exit(1);
    }
    console.log(`Escuchando en el puerto ${PORT}`);
})
'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Agenda-Movil', {useNewUrlParser:true})
.then((err, res)=> {
    console.log('conexion a la BD correctamente');

    app.listen(port,() => {
        console.log("El servidor local de Node y Express está corriendo en el puerto "+ port);


    });
})
.catch(err=>console.log(err));


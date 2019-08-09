require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//habilitar public
app.use(express.static(path.resolve(__dirname, '../public')));

//Configuración global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB,
  { useNewUrlParser: true, useCreateIndex: true },
  (err, res)=>{
    if(err){
      console.log('Unable to connect to the server. Please start the server. Error:', err);
    }else{
      console.log('Base de datos ONLINE');
    }
});

app.listen(process.env.PORT, ()=>{
  console.log('Escuchando el puerto: ', process.env.PORT);
});

require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB,
  { useNewUrlParser: true, useCreateIndex: true },
  (err, res)=>{
    if(err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, ()=>{
  console.log('Escuchando el puerto: ', process.env.PORT);
});

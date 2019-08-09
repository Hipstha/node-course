//  ============================
//  Puerto
//  ============================

process.env.PORT = process.env.PORT || 3000;

//  ============================
//  Entorno
//  ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//  ============================
//  Vencimiento de token
//  ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60*60*24*30;

//  ============================
//  SEED DE AUTENTICACIÓN
//  ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//  ============================
//  Base de datos
//  ============================

let urlDB;
if(process.env.NODE_ENV === 'dev'){
  urlDB = 'mongodb://localhost:27017/cafe';
}else{
  urlDB = 'mongodb+srv://root:1620408@cluster0-wea89.mongodb.net/cafe';
}

process.env.URLDB = urlDB;

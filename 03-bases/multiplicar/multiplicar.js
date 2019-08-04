const fs = require('fs');
const colors = require('colors');

let listarTabla = (base, limite=10)=>{
  //Muestra la tabla }
  return new Promise((resolve, reject)=>{
    if(!Number(base)){
      reject(`El valor introducido '${base}' no es un número`);
      return;
    }
    if(!Number(limite)){
      reject(`El valor introducido '${limite} no es un número'`);
      return;
    }

    console.log('========================'.green);
    console.log(`tabla de ${base}`.green);
    console.log('========================'.green);

    for(let count=1; count<=limite; count++){
      console.log(`${base} * ${count} = ${base*count}`);
    }
  });
}

let crearArchivo = (base, limite=10) => {
  return new Promise((resolve, reject)=>{

    if(!Number(base)){
      reject(`El valor introducido '${base}' no es un número`);
      return;
    }

    let data = '';

    for(let count=1; count<=limite; count++){
      data += `${base} * ${count} = ${base*count}\n`;
    }

    fs.writeFile(`tablas/tabla-${base}-al-${limite}.txt`, data, (err)=>{
      if(err) reject(err);
      else resolve(`tabla-${base}-al-${limite}.txt`.green);
      //console.log(`EL archivo tabla-${base}.txt ha sido creado`);
    });
  });
}

module.exports = {
  crearArchivo,
  listarTabla
}

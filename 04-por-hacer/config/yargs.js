const descripcion = {
  demand: true,
  alias: 'd',
  desc: 'Descripción de la tarea por hacer'
}

const completado = {
  alias: 'c',
  default: true,
  desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
  .command('crear', 'Agrega un nuevo elemento a realizar', {
    descripcion
  })
  .command('actualizar', 'Actualiza el estado completado de una tarea', {
    descripcion,
    completado
  })
  .command('borrar', 'Borra una tarea', {
    descripcion
  })
  .help()
  .argv;

module.exports = {
  argv
}

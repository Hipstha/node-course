let nombre = "Deadpool";
let real = "Wade Winston";

console.log(nombre + " " + real);
console.log(`Personaje: ${nombre} - Persona: ${real}`);

let nombreCompleto = nombre + " " + real;
let nombreTemplate = `${nombre} ${real}`;

console.log(nombreCompleto === nombreTemplate);

function getNombre(){
  return `${nombre} ${real}`;
}

console.log(`El nombre de: ${getNombre()}`);

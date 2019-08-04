// function sumar(a, b){
//   return a + b;
// }

// let sumar = (a, b) => {
//   return a + b;
// }

let sumar = (a, b) => a + b;

// function saludar(nombre){
//   return `Hola ${nombre}`;
// }

//let saludar = () => "Hola mundo" ;
let saludar = (nombre) => `Hola ${nombre}`;

let deadpool = {
  nombre: "Wade",
  apellido: "Winston",
  poder: "Regeneración",
  getNombre(){
    return `${this.nombre} ${this.apellido} - poder ${this.poder}`
  }
}


console.log(saludar("Alejandro"));

console.log(sumar(10, 20));

console.log(deadpool.getNombre());

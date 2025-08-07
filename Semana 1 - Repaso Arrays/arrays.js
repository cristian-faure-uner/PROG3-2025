// CREAR ARRAY 
let frutas = ['mango', 'frutilla', 'narnaja', 'pera'];
console.log(frutas);

// CON CONSTRUCTOR 
let temas = new Array(5);
console.log(temas);

// MULTIPLES TIPOS DE DATOS
let varios = ['pera', 55, false, {nombre:'Arya', edad: 13}];
console.log(varios);

// ACCEDER A LOS ELEMENTO
let alumnos = new Array('Daenerys', 'Arya', 'Davos');
console.log(alumnos[0]);
console.log(alumnos[alumnos.length - 1])


// ARRAY DE ARRAY 
let contenedor = [
    ["primero", 1],
    ["segundo", 2],
    ["tercero", 3]
]

let nuevoC = ["cuarto",4];

console.log(contenedor);

contenedor.push(nuevoC);

console.log(contenedor);

console.log('El array frutas tiene -> ', frutas.length , ' elementos');


//RECORRER ARRAY 
for(let i=0; i < alumnos.length; i++){
    console.log(alumnos[i]);
}

for(let alumno of alumnos){
    console.log(alumno);
}

// PLANTILLA DE LITERALES  
alumnos.forEach(function(alumno, indice){
    console.log(`El ${alumno} ubicado en la posición ${indice}`);
});
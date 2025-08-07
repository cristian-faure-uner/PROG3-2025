// ARRAY DE OBJETOS
let alumnos = [
    {nombre: 'Daenerys', edad: 15},
    {nombre: 'Jon Snow', edad: 30},
    {nombre: 'Arya Stark', edad: 12},
    {nombre: 'Samwell Tarly', edad: 25},
    {nombre: 'Robert Baratheon', edad: 40},
]

// FILTER()
let alumnosMayores = alumnos.filter(alumno => alumno.edad > 20);
console.log("\n--- Alumnos mayores a 20 ---");
console.log(alumnosMayores);

// MAP()
const nombresDeAlumnos = alumnos.map(alumno => alumno.nombre);
console.log("\n--- Nombres de los alumnos ---");
console.log(nombresDeAlumnos); 

const alumnosMas5 = alumnos.map(alumno => {
    return {
        nombre: alumno.nombre,
        edad: alumno.edad + 5
    };
});

console.log("\n--- Alumnos en 5 años ---");
console.log(alumnosMas5); 

// FIND()
let primero = alumnos.find(alumno => alumno.edad > 20);
console.log("\n--- Primer alumno con mas de 20 años ---");
console.log(primero);

// FINDINDEX()
let pasaPrueba2 = alumnos.findIndex(alumno =>  alumno.edad >= 30);
console.log("\n--- Ubicacion del primer alumno con mas de 20 años ---");
console.log(pasaPrueba2);
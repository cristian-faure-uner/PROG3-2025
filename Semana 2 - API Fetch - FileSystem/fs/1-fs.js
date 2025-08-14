const fs = require('fs');


console.log(fs);

// LEO EL ARCHIVO DE FORMA SINCRONICA
const programa = fs.readFileSync('./programa.txt', 'utf-8');
console.log(programa);

// AGREGO UNA NUEVA LINEA AL ARCHIVO
const nuevaLinea = '5. SQL';
fs.appendFileSync('./programa.txt', nuevaLinea);
console.log(fs.readFileSync('./programa.txt', 'utf-8'));

// APPEND EN CASO DE NO EXISTIR EL ARCHIVO LO CREA
fs.appendFileSync('./programas.txt', nuevaLinea);
console.log(fs.readFileSync('./programaaa.txt', 'utf-8'));

// ELIMINO UN ARCHIVO
fs.unlinkSync('./nuevoArchivo.txt');
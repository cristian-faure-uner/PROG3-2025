let alumnos = new Array('Daenerys', 'Arya', 'Davos');
console.log(alumnos);

//PUSH()
alumnos.push('Ramsey');
alumnos.push('Khal', 'Olenna');
console.log(alumnos);

//POP()
const eliminado = alumnos.pop();
console.log(`Alumno eliminado ${eliminado}`);

//SHIFT()
const eliminado2 = alumnos.shift();
console.log(`Alumno eliminado ${eliminado2}`);

//LENGTH
console.log(`Tenemos ${alumnos.length} alumnos`);

//UNSHIFT()
alumnos.unshift('Sansa');
console.log(alumnos);

alumnos.unshift('Viserys', 'Rickon');
console.log(alumnos);


// SLICE()
const alumnos2 = alumnos.slice();
console.log(`alumnos2 `, alumnos2)

let nombre = 'rickon';
alumnos[1] = nombre.toUpperCase();

console.log(`alumnos `, alumnos);
console.log(`alumnos2 `, alumnos2);


// SPLICE()
alumnos.splice(1,0,'test');
console.log(`alumnos `, alumnos);

alumnos.splice(0,1,'nuevo uno');
console.log(`alumnos `, alumnos);


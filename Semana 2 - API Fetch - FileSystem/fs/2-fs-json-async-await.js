
// EJEMPLO DE LECTURA Y ESCRITUR UTILIZANDO ASYNC / AWAIT

// MODULO FS DE NODE QUE EN LUGAR DE USAR CALLBACKS OBTIENE LA VERSION DE FUNCIONES 
// QUE DEVUELVEN UNA PROMESA.
const fs = require('fs').promises;

const personaje = {
    "id": 8,
    "nombre": "Roberto Baratheon"
}

const agregarPersonaje = async () => {
    try{
        // LEO EL ARCHIVO
        const datos = await fs.readFile('./personajes.json', 'utf-8');
        
        const personajes = JSON.parse(datos);
        console.log(personajes);

        //AGREGO UN NUEVO PERSONAJE AL ARRAY
        personajes.push(personaje);
        console.log('Array modificado ' , personajes);

        
        const personajesActualizados = JSON.stringify(personajes);
        console.log('Escribiendo archvio actualizdo');

        // EXCRIBO EN EL ARCHIVO
        await fs.writeFile('./personajes.json', personajesActualizados);

        console.log('Personajes actualizado!');
    }catch (error){
        console.error(error)
    }
}


agregarPersonaje();
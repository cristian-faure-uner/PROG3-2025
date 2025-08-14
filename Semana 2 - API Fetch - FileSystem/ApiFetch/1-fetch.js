// REPRESENTA EL RECURSO QUE CONSULTAREMOS, NOS RESPONDE EN FORMATO JSON
const urlApi = 'https://fakestoreapi.com/products';

// INICIO LA SOLICITUD AL SERVIDOR PASANDOLE LA URL
fetch(urlApi)
    .then((response) => {                
        // CUANDO LA PERTICION TERMINA EL THEN RECIBE UN OBJETO "RESPONSE" CON LA RESPUESTA DEL SERVIDOR
        // console.log(response)
                
        if (!response.ok){ 
            throw new Error('Error ' + response.status)
        }

        // CONVIRTO LA RESPUESTA DEL SERVIDOR EN JSON A UN OBJETO O ARRAY JAVASCRIPT 
        // NOS DEVUELVE UNA NUEVA PROMESA QUE SE RESUELVE CON LOS DATOS PARSEADOS ENCADENO CON OTRO THEN()
        return response.json(); 
    })
    .then((datos) => {
        console.log(datos);
        for (const p of datos) {
            console.log(`${p.title} - ${p.price}`)
        }
    })
    .catch( 
        (error) => 
            console.log(error) 
        );

    
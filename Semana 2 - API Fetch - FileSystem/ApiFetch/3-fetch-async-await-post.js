const urlApi = 'https://fakestoreapi.com/products';

async function crearProducto(producto) {
    try{
        const response = await fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // EL CUERPO DE LA SOLICITUD ES JSON
            },
            body: JSON.stringify(producto) // CONVIERTO EL OBJETO JavaScript A UNA CADENA DE TEXTO JSON
        })
        if (!response.ok){ 
            throw new Error('Error ' + response.status)
        }
        
        const datos = await response.json();
        console.log(datos);
        
    }catch(error){
        console.log('error ', error);
    }
}

const producto =  {
    title: 'test product',
    price: 13.5
}

crearProducto(producto);
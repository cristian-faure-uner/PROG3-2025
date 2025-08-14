const urlApi = 'https://fakestoreapi.com/products';

// DECLARO UNA FUNCION ASINCRONA
async function buscarProductos() {

    try{
        const response = await fetch(urlApi);
        if (!response.ok){ 
            throw new Error('Error ' + response.status)
        }
                
        const datos = await response.json();
        console.log(datos);
    }catch(error){
        console.log('error ', error);
    }
}

buscarProductos();

async function buscarUnProducto(id) {
    try{

        const response = await fetch(`${urlApi}/${id}`);
        if (!response.ok){ 
            throw new Error('Error ' + response.status)
        }
                
        const datos = await response.json();
        console.log(datos);

    }catch(error){
        console.log('error ', error);
    }
}
buscarUnProducto(6);
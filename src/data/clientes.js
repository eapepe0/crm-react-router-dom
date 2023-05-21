

//* esta funcion obtiene mediante la API todos los clientes
export async function obtenerClientes () {
    const respuesta = await fetch ( import.meta.env.VITE_API_URL) 
    const resultado = await respuesta.json()
    return resultado;
}


//* esta funcion le pasamos los datos ( valores del form en forma de objeto )
export async function agregarCliente (datos) {
    try {
        //* hacemos el pedido POST con los datos en forma de JSON y guardamos la respuesta
        const respuesta = await fetch (import.meta.env.VITE_API_URL, {
            method : 'POST',
            body : JSON.stringify( datos ) ,
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        await respuesta.json() //* esperamos el json de respuesta

    } catch (error) { //* si hay algun error lo mostramos en consola
        console.log(error)
    }
}

//* esta funcion le pasamos un id y obtenemos los datos del cliente , lo usamos para editarClientes se usa para llenar el <Form/>
export async function obtenerUnCliente (id) {
    const respuesta = await fetch ( `${import.meta.env.VITE_API_URL}/${id}`) 
    const resultado = await respuesta.json()
    return resultado;
}


//* esta funcion se encarga de actualizar los datos de un cliente mediante , id y datos

export async function actualizarCliente (id , datos){
    try {
        //* hacemos el pedido PUT con los datos en forma de JSON y guardamos la respuesta , al ser una URL dinamica , le agregamos el ID en la url
        const respuesta = await fetch (`${import.meta.env.VITE_API_URL}/${id}`, {
            method : 'PUT',
            body : JSON.stringify( datos ) ,
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        await respuesta.json() //* esperamos el json de respuesta
    } catch (error) {
        console.log(error) //* si hay algun error lo mostramos en consola
    }
}
//* funcion que elimina un cliente por su id
export async function eliminarCliente (id){
    try {
        //* hacemos el pedido DELETE y guardamos la respuesta , al ser una URL dinamica , le agregamos el ID en la url para que sepa que borrar
        const respuesta = await fetch (`${import.meta.env.VITE_API_URL}/${id}`, {
            method : 'DELETE',
        })
        await respuesta.json() //* esperamos el json de respuesta
    } catch (error) {
        console.log(error) //* si hay algun error lo mostramos en consola
    }
}   

import { Form, useNavigate , useLoaderData, useActionData, redirect } from "react-router-dom";
import { Error, Formulario } from "../components";
import {  actualizarCliente, obtenerUnCliente } from "../data/clientes"



//*  en el param se carga los parametros que nos esta visitando por ej ?id:22141&type=asdf
export async function loaderEditarCliente( { params } ){
    
    const cliente = await obtenerUnCliente(params.clienteId) //* cargamos el cliente

    if(Object.values(cliente).length === 0){ //* si el objeto viene vacio significa que no existe
        throw new Response ('',{ //* creamos una nueva respuesta de error , la cual atrapa el componente <ErrorPage/>
            status : 404 , 
            statusText : 'No hay Resultados.'
        })
    }
    return cliente;  //* caso contrario devolvemos el cliente 
} 

//* accion que se dispara por el POST que no da el submit
export async function actionEditarCliente( { request , params } ){
    //* recibe un request ( van los datos del form ) 
    //*  en params el id del cliente que queremos editar (clienteId)

    const formData = await request.formData() //* de ese request podemos extraer los datos editados del form
    const data = Object.fromEntries(formData) //* aca la convertimos en un objeto { email: "eapepe@gmail.com" ,empresa: "Chinin S.A" ,nombre: "Colosin", notas: "111111",telefono: "1111111" }

    const email = formData.get('email'); //* obtenemos el mail de forma individual para poder hacer mas abajo una validacion

    const errores = [] //* definimos este array para guardar los errores

    if(Object.values(data).includes('')){ //* si hay algun campo del form vacio
        errores.push('Todos los campos son obligatorios') //* le ponemos al array errores el mensaje 
    }

    // eslint-disable-next-line no-control-regex
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\([\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    //* creamos un regexp para validar el mail

    if(!regex.test(email)){ //* si el regex no es valido
        errores.push("El email no es valido") //* le agregamos al array de errores el siguiente mensaje
    }

    if(Object.keys(errores).length){ //* si existe algo en el array errores
        return errores; //* devolvemos los errores y terminamos la ejecucion del action
    }

    await actualizarCliente(params.clienteId , data) //*  detengo la ejecucion hasta que se termine la funcion llamada
    //* la cual se encarga de actualizar el cliente mediante un PUT
    return redirect( "/" ) //* debe devolver algo , en este caso nos lleva con el redirect al root
}

export const EditarClientes = () => {
    const navigate = useNavigate() //*  es un hook que sirve para cambiar la ruta actual
    const cliente = useLoaderData(); //* nos devuelve el cliente, para poder cargar los datos en el form para que sean mas faciles de modificarlos
    const errores = useActionData(); //* nos permite usar datos que retorna el action 

  return (
    <>
    <h1 className="font-black-text-4xl text-blue-900">Editar Cliente</h1>
    <p className="mt-3">Aqui podras editar tu cliente.</p>
    <div className="flex justify-end">
        <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase" onClick={() => navigate(-1)}>Volver</button>
    </div>
    <div className="bg-white shadow rounded-md mx-auto md:w-3/4 px-5 py-10 mt-20">
      
      {/* si hay un error (errores?.length) mapeamos el array errores (pueden ser 2 errores , mail y campos vacios) => los mostramos en el componente Error */}
      {errores?.length && errores.map((error , indice)=> <Error key={indice}>{error}</Error>)}  

      {/* Aca llamamos el action con el metodo post */}
        <Form method='post'>
            <Formulario cliente={cliente}/>
            <input type="submit" value="Actualizar Cliente" className="mt-5 bg-blue-800 p-3 uppercase font-bold text-white text-lg" />
        </Form>
    </div>
</>
  )
}

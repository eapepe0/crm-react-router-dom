import { Form, redirect, useNavigate } from "react-router-dom"
import { eliminarCliente } from "../data/clientes"

//* una accion que recibe unos parametros
export async function actionEliminarCliente({params}){
    //* esperamos la respuesta a la funcion Eliminar cliente
    await eliminarCliente(params.clienteId)
    return redirect('/') //* devolvemos un redirect a la raiz
}


// eslint-disable-next-line react/prop-types
export const Clientes = ({cliente}) => {

    const navigate = useNavigate() //*  es un hook que sirve para cambiar la ruta actual
    // eslint-disable-next-line react/prop-types
    const { nombre ,  telefono , email , empresa , id } = cliente //*  desestructuramos de cliente
  return (
    <tr className="border-b">
        <td className="p-6 space-y-2">
            <p className="text-2xl text-gray-800">{nombre}</p>
            <p>{empresa}</p>
        </td>
        <td className="p-6">
            <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span> { email }</p>
            <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Telefono: </span> { telefono }</p>
        </td>
        <td className="p-6 flex gap-5">
            {/* si le hacemos click navegamos a /clientes/id (id del cliente donde mostramos este componente mediante un map haciendo un navigate estariamos llamando al componente EditarClientes) */}
            <button type="button" className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs" onClick={()=> navigate(`/clientes/${id}/editar`)}>Editar</button>

            {/* hacemos que el boton eliminar se convierta en un form asi capturamos el evento submit y lo usamos para confirmar si queremos o no borrar , tambien lo usamos para
                ponerle el metodo post y el action
            */}
            <Form method='post' action={`/clientes/${id}/eliminar`} 
                onSubmit= {(e) => {
                    if(!confirm('¿Deseas eliminar el cliente?')){
                        e.preventDefault();
                    }
                }}
            >
                <button type="submit" className="text-red-600 hover:text-red-700 uppercase font-bold text-xs">Eliminar</button>
            </Form>
        </td>
    </tr>
  )
}

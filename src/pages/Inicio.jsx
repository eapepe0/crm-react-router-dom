import { useLoaderData } from "react-router-dom";
import { Clientes } from "../components/Clientes";
import { obtenerClientes } from "../data/clientes";


export function loader (){
    const clientes = obtenerClientes(); //* llamamos a la funcion obtenerClientes la cual obtiene una respuesta de una API
    return clientes  //* siempre debe devolver algo en este caso los clientes
}
export const Inicio = () => {
    const datos = useLoaderData(); //* usamos los datos obtenidos por el loader
   
  return (
    <>
        {/* si existen los datos (clientes) los mostramos dentro de la tabla con el componente => Clientes */}
        {/* si no existen mostramos el mensaje no hay Cliente aun */}
        <h1 className="font-black-text-4xl text-blue-900">Clientes</h1>
        <p className="mt-3">Administra tus clientes</p>
        {datos.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
            <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="p-2">Cliente</th>
                    <th className="p-2">Contacto</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {datos.map(cliente => (
                    <Clientes cliente={cliente} key={cliente.id}/>
                ))}
            </tbody>
        </table>
        ): (
        <p className="text-center mt-10">No hay Clientes aun</p>
        )
        }
    </>
  )
}

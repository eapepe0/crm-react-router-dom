import { useRouteError } from "react-router-dom"

//* Este componente esta encargado de mostrar los errores que nos permite capturar React Router Dom , con el hook useRouteError
//* que vemos en el componente main.jsx en errorElement 


export const ErrorPage = () => {
    const error = useRouteError() //* extraemos el error ,el cual esta en .message o si devolvemos como respuesta a una peticion en statusText

  return (
    <div className="space-y-8">
        <h1 className="text-center text-6xl font-extrabold mt-20 text-blue-900">CMR - Clientes</h1>
        <p className="text-center">Hubo un error :</p>
        {/* muestra condicionalmente el error si existe uno o el otro */}
        <p className="text-center"><code>{error.message || error.statusText}</code></p>
    </div>
  )
}

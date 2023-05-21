import { useNavigate , Form , useActionData, redirect } from "react-router-dom"
import { Error } from "../components/Error";
import { Formulario } from "../components/Formulario";
import { agregarCliente } from "../data/clientes";


//* esto se dispara cuando se usa el metodo POST con el boton submit Registrar Cliente
export async function action({ request }){ //* funcion asincrona que recibe un request

    const formData = await request.formData()   //* de ese request podemos extraer los datos del form
    const data = Object.fromEntries(formData)   //* aca la convertimos en un objeto { email: "eapepe@gmail.com" ,empresa: "Chinin S.A" ,nombre: "Colosin", notas: "111111",telefono: "1111111" }
    
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
        return errores ; //* devolvemos los errores y terminamos la ejecucion del action
    }
    
    await agregarCliente(data) //* detengo la ejecucion de codigo hasta que sea consultada la API y responda
    return redirect('/') //* debe devolver algo , en este caso nos lleva con el redirect al root
}

export const NuevoCliente = () => {
    const navigate = useNavigate(); //*  es un hook que sirve para cambiar la ruta actual
    const  errores  = useActionData(); //* nos permite usar datos que retorna el action 
  return (
   <>
        <h1 className="font-black-text-4xl text-blue-900">Nuevo Cliente</h1>
        <p className="mt-3">Llena todos los campos para registrar un nuevo cliente.</p>
        <div className="flex justify-end">
            <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase" onClick={() => navigate(-1)}>Volver</button>
        </div>
        <div className="bg-white shadow rounded-md mx-auto md:w-3/4 px-5 py-10 mt-20">
            {/* si hay un error (errores?.length) mapeamos el array errores (pueden ser 2 errores , mail y campos vacios) => los mostramos en el componente Error */}
            {errores?.length && errores.map((error , indice)=> <Error key={indice}>{error}</Error>)}

            {/* Aca llamamos el action con el metodo post */}
            <Form method='post'>
                <Formulario />
                <input type="submit" value="Registrar Cliente" className="mt-5 bg-blue-800 p-3 uppercase font-bold text-white text-lg" />
            </Form>
            
        </div>
   </>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import { Layout , ErrorPage , actionEliminarCliente } from './components'
import { NuevoCliente , Inicio , loader , action as nuevoClienteAction , EditarClientes , loaderEditarCliente , actionEditarCliente } from './pages'

import './index.css'


 
const router = createBrowserRouter([
  {
    path : '/', /* creamos nuestro path root o raiz */
    element : <Layout />, //* tendra el elemento a renderizar que sera Layout (es proporcionar una estructura común para los componentes de la aplicación y definir elementos visuales o funcionales que se repiten en todas o varias partes de la interfaz. )
    children : [ //* hijos
      {
        index : true, //* le decimos que este es el index o indice /
        element : <Inicio />, //* renderizamos el elemento Inicio
        loader : loader, //* útil cuando se realiza una llamada a una API para obtener datos antes de renderizar un componente o cuando se necesita procesar una operación que pueda llevar tiempo.
        errorElement : <ErrorPage/> //* este es el elemento que mostraremos si hay un error en esta pantalla
      },
      {
        path : '/clientes/nuevo', //* si llamamos este path
        element : <NuevoCliente />, //* se renderizara este componente
        action : nuevoClienteAction, //* el cual llamara este action
        errorElement : <ErrorPage/>, //* este es el elemento que mostraremos si hay un error en esta pantalla
      },
      {
        path : '/clientes/:clienteId/editar', //* si llamamos este path
        element : <EditarClientes/>, //* se renderizara este componente
        loader : loaderEditarCliente, //* útil cuando se realiza una llamada a una API para obtener datos antes de renderizar un componente o cuando se necesita procesar una operación que pueda llevar tiempo.
        errorElement : <ErrorPage />, //* este es el elemento que mostraremos si hay un error en esta pantalla
        action : actionEditarCliente,//* el cual llamara este action
      },
      {
        path : '/clientes/:clienteId/eliminar', //* si llamamos este path
        errorElement : <ErrorPage />, //* este es el elemento que mostraremos si hay un error en esta pantalla
        action : actionEliminarCliente,//* el cual llamara este action
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router }/>
    {/* <App /> */}
  </React.StrictMode>,
)

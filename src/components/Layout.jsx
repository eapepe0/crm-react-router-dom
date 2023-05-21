
import { Outlet , Link , useLocation } from 'react-router-dom'

//* este componente se encarga de Permite definir una estructura de la aplicación de manera centralizada, 
//*  encapsulando elementos como encabezados, pies de página, barras de navegación y otros componentes comunes que se encuentran en todas las páginas 
//*  o secciones de la aplicación. Esto ayuda a mantener un código más organizado, evitar la duplicación y facilitar los cambios y actualizaciones en la interfaz de usuario.


export const Layout = () => {
    const location = useLocation() //* en que ruta estamos
    return (
       <div className="md:flex md:min-h-screen">
         <aside className="md:w-1/4 bg-blue-900 px-5 py-10"> 
            <h2 className='xl:text-4xl md:text-2xl font-black text-center text-white'>CMR -  Clientes</h2>
            <nav className="mt-10">
               {/* depende del location que seria la ruta en la cual estamos mostramos una clase o la otra */}
                <Link className={`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`} to="/">Clientes</Link>
                <Link className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`} to='/clientes/nuevo'> Nuevo Cliente </Link>
                
            </nav>
         </aside>

         <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
            <Outlet /> {/* El componente Outlet indica dónde se renderizará el contenido de las rutas secundarias , Children*/}
         </main>
       </div>
      )
}

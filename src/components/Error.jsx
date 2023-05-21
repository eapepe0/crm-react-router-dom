
//* Este componente esta encargado de mostrar un div de color rojo que muestra un error

// eslint-disable-next-line react/prop-types
export const Error = ({children}) => {
  return (
    <div className='text-center my-4 bg-red-600  text-white font-bold p-3 uppercase'>
        {children}
    </div>
  )
}

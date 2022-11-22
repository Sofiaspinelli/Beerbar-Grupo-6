import React from 'react'
import Article from './Article'

function Main() {
  let productos =[
    {
      id:1,
      nombre:"Pizza",
      marca:"nafa",
      detalle:"deliciosa",
      precio:1000,
      descuento:10,
      stock:20,
      categoria:"ninguno",
      tipo: "comida",
      imagen: "img-1662398149075.png"
    },
    {
      id:1,
      nombre:"Pizza",
      marca:"nafa",
      detalle:"deliciosa",
      precio:1000,
      descuento:10,
      stock:20,
      categoria:"ninguno",
      tipo: "comida",
      imagen: "img-1662398149075.png"
    },
    {
      id:1,
      nombre:"Pizza",
      marca:"nafa",
      detalle:"deliciosa",
      precio:1000,
      descuento:10,
      stock:20,
      categoria:"ninguno",
      tipo: "comida",
      imagen: "img-1662398149075.png"
    }
  ] 
  return (
    <main>

        <h1>PROMOCIONES</h1>

        <section className="productos">
          {productos.map((producto, index) => 

            <Article
            key = {index}
            id = {producto.id}
            nombre = {producto.nombre}
            precio = {producto.precio}
            descuento = {producto.descuento}
            imagen = {producto.imagen}
            />

          )}
              
          
        </section>

        <h1>PRODUCTOS DESTACADOS</h1>


    </main>
  )
}

export default Main
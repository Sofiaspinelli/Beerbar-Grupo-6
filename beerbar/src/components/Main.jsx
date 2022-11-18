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

        <section class="productos">
          {productos.map((producto, index) => 

            <Article
            key = {index}
            id = {producto.id}
            nombre = {producto.nombre}
            marca = {producto.marca}
            detalle = {producto.detalle}
            precio = {producto.precio}
            descuento = {producto.descuento}
            stock = {producto.stock}
            categoria = {producto.categoria}
            tipo = {producto.tipo}
            imagen = {producto.imagen}
            />

          )}
              
          
        </section>

        <h1>PRODUCTOS DESTACADOS</h1>


    </main>
  )
}

export default Main
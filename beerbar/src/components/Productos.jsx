import React, {useEffect, useState} from 'react'
import Article from './Article'

function Productos() {
    const [carta, setcarta] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      fetch("http://localhost:3005/api/productos")
        .then((response) => response.json())
        .then((valores) => {
          setcarta(valores.result);
          setTimeout(() => {
            setLoading(false)
          }, 2000);
        })
        .catch(error => console.log(error))
    }, [loading])
    console.log(carta);

    if (loading) {
      return (
          <div>
              <h1>loading...</h1>
          </div>
      )
    }

  return (
    <div>
        <h1>Productos</h1>
        <section className="productos">
    {
        carta.map((values, index) => (
            <Article
            key = {index}
            id = {values.id}
            nombre = {values.nombre}
            precio = {values.precio}
            descuento = {values.descuento}
            imagen = {values.imagenes[0].name}
            />
        ))
    }
    </section>
    </div>
  )
}

export default Productos
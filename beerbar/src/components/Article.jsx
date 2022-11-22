import React from 'react'
import PropTypes from 'prop-types'

function Article({id, nombre, imagen, detalle, precio, descuento}) {
    return (
    
    <div>
        <img src={`/img/productos/${imagen}`} alt="" />
        <div className="contenedor">
            <h3>{nombre}</h3>

            <p className="old">{precio}</p>
            <p className="precio">${precio - (precio * descuento / 100)}<small className="descuento">{descuento}</small></p>
            
            
            <p className="precio">${precio}</p>
        
        </div>
        <button><a href={`/products/detail/${id}`}>Comprar</a></button>
    </div> 
    
    )
}

Article.propTypes = {
    id: PropTypes.number,
    nombre: PropTypes.string,
    marca: PropTypes.string,
    imagen: PropTypes.string,
    type: PropTypes.number,
    detalle: PropTypes.string,
    categoria: PropTypes.number,
    precio: PropTypes.number,
    descuento: PropTypes.number,
    stock: PropTypes.number,
    
}
// Article.defaultProps{

// }
export default Article

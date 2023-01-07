import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Crear() {

  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [values, setValues] = useState({
    selectType: '',
    nombre: '',
    marca: '',
    detalle: '',
    img: '',
    precio: '',
    descuento: '',
    stock: '',
    categoria: ''
  })

  // const actualUrl = window.location.href;

  useEffect(() => {
    fetch("http://localhost:3005/api/productos")
      .then((response) => response.json())
      .then((valores) => {
        setCategorias(valores.data);
        setIsLoading(false)

      })
      .catch(error => console.log(error))
  }, [isLoading])

  const handleChange = (e) => {
    let { target } = e
    let { name, value } = target

    let newValues = {
      ...values,
      [name]: value
    }

    setValues(newValues)
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    /* let response = await fetch("http://localhost:3005/api/crear",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(values)
    }) */

    let response = await axios.post(`http://localhost:3005/api/crear`, values)
    console.log(response);
    if (response.status === 200) {
      return navigate('/admin/productos')
    }
  }

  if (isLoading) {
    return (
      <div>
        Cargando ...
      </div>
    )
  }

  return (
    <section className='add'>
      <h1>formulario de cracion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="selectType">Tipo de producto</label>
          <select name="selectType" id="selectType" onChange={handleChange}>
            <option value="null" hidden>seleccionar una opcion</option>
            <option value="1" >Comida</option>
            <option value="2" >Bebidas</option>
            <option value="3" >Aperitivos</option>
          </select>

          <small id="typeError">mensaje de error</small>
        </div>
        <div>
          <label for="nombre">Nombre de Producto</label>
          <input type="text" name="nombre" id="nombre" placeholder="Ingresar nombre" onChange={handleChange} />

          <small id="nameError">mensaje de error</small>
        </div>
        <div>
          <label for="marca">Marca de Producto</label>
          <input type="text" name="marca" id="marca" placeholder="Ingresar marca" onChange={handleChange} />

          <small id="marcaError">mensaje de error</small>
        </div>
        <div>
          <label for="detalle">Detalle del producto</label>
          <textarea name="detalle" id="detalle" cols="30" rows="4" placeholder="Agregar descripcion" onChange={handleChange}></textarea>

          <small id="detalleError"><small id="precioError">mensaje de error</small></small>
        </div>
        <div className="file">
          <label for="img">Imagen del producto</label>
          <div className="file-select" id="src-file1" >
            <input name="img" type="file" id="img" multiple onChange={handleChange}/>
          </div>
          <small id="imgError">mensaje de error</small>
        </div>
        <div className="p-s">
          <div>
            <label for="precio">Precio</label>
            <input type="number" name="precio" id="precio" placeholder="precio" onChange={handleChange}/>

            <small id="precioError">mensaje de error</small>
          </div>
          <div>
            <label for="descuento">Descuento</label>
            <input type="number" name="descuento" id="descuento" placeholder="descuento" onChange={handleChange}/>

            <small id="descuentoError">mensaje de error</small>
          </div>
          <div className="stock">
            <label for="stock">Stock</label>
            <input type="number" name="stock" id="stock" placeholder="stock" onChange={handleChange}/>

            <small id="stockError">mensaje de error</small>
          </div>
        </div>

        <div>
          <label for="categoria">Categoria</label>
          <select name="categoria" id="categoria" onChange={handleChange}>
            <option value="undefined" hidden>seleccionar una opcion</option>
            <option value="1" >Nuevo</option>
            <option value="2" >Especial</option>
            <option value="3" >Ninguna</option>
          </select>

          <small id="categoriaError">mensaje de error</small>
        </div>
        <div className="botton">
          <button id="btn-valid" type="submit">Añadir Producto</button>
          <NavLink to="/admin/productos"><button type="button">Cancelar</button></NavLink>
        </div>
      </form>
    </section>
  )
}

export default Crear
import React, {useEffect, useState} from 'react'
// import Swal from 'sweetalert2';
import axios from 'axios';
// import { NavLink } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'

function Editar() {
  const navigate = useNavigate();
  const [carta, setCarta] = useState([])
  const [id,setId] = useState('0')
  const [isLoading, setIsLoading] = useState(true)
  
  const actualUrl = window.location.href;
  
  const [values, setValues] = useState({
    selectType: '',
    nombre: '',
    marca: '',
    descripcion: '',
    img: '',
    precio: '',
    descuento: '',
    stock: '',
    categoria: ''
  })
  
  useEffect(()=>{
    let barra = actualUrl.lastIndexOf('/') + 1
    let id = actualUrl.substring(barra,100)
    setId(id)
    fetch(`http://localhost:3005/api/producto/${id}`)
      .then((response) => response.json())
      .then((valores) => {
        setCarta(valores.data);
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  },[actualUrl, isLoading])

  // useEffect(() => {
  //   let idparam = id
    
  // }, [isLoading])

  const handleChange = (e) => {
    let {target} = e
    let {name,value} = target

    let newValues = {
      ...values,
      [name] : value
    }
        
    setValues(newValues)
  };
  console.log(id);

 const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await axios.put(`http://localhost:3005/api/editar/${id}`,values)
    // console.log(response);
    if(response.status === 200){
      return navigate('/admin/productos')
    }
 }

console.log(carta);

  if (isLoading) {
    return(
      <div>
        Cargando ...
      </div>
    )
  }

  return (
    <section className="editar">
        <h1>Editar producto</h1>
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <label for="selectType">Tipo de producto</label>
                <select name="selectType" id="selectType" onChange={handleChange}>
                  { carta[0].type_id === 1 ?
                    <option value="1" selected>Comida</option>
                    :
                    <option value="1" >Comida</option>
                  }
                  { carta[0].type_id === 2 ?
                    <option value="2" selected>Bebidas</option>
                    :
                    <option value="2" >Bebidas</option>
                  }
                  { carta[0].type_id === 3 ?
                     <option value="3" selected>Aperitivos</option>
                    :
                    <option value="3" >Aperitivos</option>
                  }
                </select>
                <small id="typeError">mensaje de error</small>
            </div>
            <div>
                <label for="nombre">Nombre de Producto</label>
                <input type="text" name="nombre" id="nombre" placeholder="Ingresar nombre" defaultValue={carta[0].nombre} onChange={handleChange}/>
                <small id="nameError">mensaje de error</small>
            </div>
            <div>
                <label for="marca">Marca de Producto</label>
                <input type="text" name="marca" id="marca" placeholder="Ingresar marca" defaultValue={carta[0].marca} onChange={handleChange}/>
                <small id="marcaError">mensaje de error</small>
                <small>**Solo para productos con Marca**</small>
            </div>
            <div>
                <label for="descripcion">Descripción de producto</label>
               <textarea name="descripcion" id="descripcion" cols="30" rows="4" placeholder="Ingresar descripción de producto" onChange={handleChange}>{carta[0].detalle}</textarea>
               <small id="detalleError">mensaje de error</small>
            </div>
            <div>
                <label for="categoria">Categoria</label>
                <select name="categoria" id="categoria" onChange={handleChange}>
                { carta[0].categoria_id === 1 ?
                    <option value="1" selected>Nuevo</option>
                    :
                    <option value="1" >Nuevo</option>
                  }
                  { carta[0].categoria_id === 2 ?
                     <option value="2" selected>Especial</option>
                    :
                    <option value="2" >Especial</option>
                  }
                  { carta[0].categoria_id === 3 ?
                     <option value="3" selected>Ninguna</option>
                    :
                    <option value="3" >Ninguna</option>
                  }   
                </select>
                <small id="categoriaError">mensaje de error</small>
            </div>

            <div>
                <label for="stock">Stock</label>
                <input type="number" name="stock" id="stock" placeholder="Ingrese el stock" defaultValue={carta[0].stock} onChange={handleChange}/>
                <small id="stockError">mensaje de error</small>
                
            </div>
            <div>
                <label for="precio">Precio</label>
                <input type="number" name="precio" id="precio" placeholder="Ingresar precio de producto" defaultValue={carta[0].precio} onChange={handleChange}/>
                <small id="precioError">mensaje de error</small>
            </div>
            <div>
                <label for="descuento">Descuento</label>
                <input type="number" name="descuento" id="descuento" placeholder="0" defaultValue={carta[0].descuento} onChange={handleChange}/>
                <small id="descuentoError">mensaje de error</small>
            </div>
          
            <div>
                <label for="img">Cargar imagen de producto</label>
                <input className="file" type="file" name="img" id="img" width="200%" height="200%" multiple onChange={handleChange}/>
                
                    <small>mensaje de error</small>
                
            </div>
          
                <div>
                  <button id="btn-valid" type="submit">Editar Producto </button>
                  <NavLink to="/admin/productos"><button>cancelar</button></NavLink>
            </div>  
        </form>
    </section>
  )
}

export default Editar
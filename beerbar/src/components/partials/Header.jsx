import React from 'react'
import  logo  from "../../assets/logo/logo-beerbar.png";

function Header() {
  return (
    <header className="header">
    <div className="flex">
        <div className="logo">
            <a href="/"><img src={logo} alt="logo" /></a>
        </div> 
        <form action="/busqueda" method="get">
        <div className="buscar">
            <input type="text" name="search" id="search" placeholder="Birras, comida y más..." required />
            <button type="submit" className="btn">
                <i className="fa-solid fa-magnifying-glass icon"></i>
            </button>
        </div>
        </form>
        
        <div className="icons">
            <button className="carrito">
            
                {/* <a href="/products/cart"><i className="fa-solid fa-cart-shopping"></i></a> */}
                
                <a href="/users/login"><i className="fa-solid fa-cart-shopping"></i></a> 

            </button>
            <button className="burger">
                <i className="fa-solid fa-bars"></i>
            </button>
        </div>
    </div>

    <nav>
        <ul>
            <li><a href="/products">Productos</a></li>
            <li><a href="/empresa">Empresa</a></li>
            <li><a href="/ayuda">Ayuda</a></li>
          
            <li><a href="/admin/list">Admin</a></li>
          
        </ul>
        <ul className="user">
            
          
            {/* <li><a href="/users/profile">Bienvenido </a></li> */}
           
            <li><a href="/users/login">Login</a></li>
            <li><a href="/users/register">Registro</a></li>
         
            
        </ul>

        
    </nav>

</header>
  )
}

export default Header
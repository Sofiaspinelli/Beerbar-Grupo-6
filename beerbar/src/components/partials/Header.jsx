import React from 'react'

function Header() {
  return (
    <header class="header">
    <div class="flex">
        <div class="logo">
            <a href="/"><img src="/img/logo/logo-beerbar.png" alt="logo" /></a>
        </div> 
        <form action="/busqueda" method="get">
        <div class="buscar">
            <input type="text" name="search" id="search" placeholder="Birras, comida y más..." required />
            <button type="submit" class="btn">
                <i class="fa-solid fa-magnifying-glass icon"></i>
            </button>
        </div>
        </form>
        
        <div class="icons">
            <button class="carrito">
               
                <a href="/products/cart"><i class="fa-solid fa-cart-shopping"></i></a>
                
                <a href="/users/login"><i class="fa-solid fa-cart-shopping"></i></a> 
                 
            </button>
            <button class="burger">
                <i class="fa-solid fa-bars"></i>
            </button>
        </div>
    </div>

    <nav>
        <ul>
            <li><a href="/products">Productos</a></li>
            <li><a href="#">Empresa</a></li>
            <li><a href="#">Ayuda</a></li>
          
            <li><a href="/admin/list">Admin</a></li>
          
        </ul>
        <ul class="user">
            
          
            <li><a href="/users/profile">Bienvenido </a></li>
           
            <li><a href="/users/login">Login</a></li>
            <li><a href="/users/register">Registro</a></li>
         
            
        </ul>

        
    </nav>

</header>
  )
}

export default Header
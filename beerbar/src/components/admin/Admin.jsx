import React from 'react'
import { NavLink } from 'react-router-dom'

function admin() {
    return (
        <div className="container_all">
            <h1>Bienvenido a la seccion de admin</h1>
            <div className="container_box">

                <div className="box">
                    <NavLink to="/admin/productos">
                    <i className="fa-solid fa-cart-shopping icon"></i>
                    <h4>Productos</h4>
                    <p>Lista de todos los productos</p>
                    <div className="background_hover"> </div>
                    </NavLink>
                </div>

                 <div className="box">
                 <i className="fa-solid fa-users icon"></i>
                    <h4>Usuarios</h4>
                    <p>Lista de todos los usuarios</p>
                    <div className="background_hover"> </div>
                </div>

                <div className="box">
                    <i className="fas fa-envelope icon"></i>
                    <h4>mensajes</h4>
                    <p>Lorem Ipsum is simply dummy text</p>
                    <div className="background_hover"> </div>
                </div>

                {/* <div class="box">
                    <i class="fab fa-github icon"></i>
                    <h4>GitHub</h4>
                    <p>Lorem Ipsum is simply dummy text </p>
                    <div class="background_hover"> </div>
                </div>

                <div class="box">
                    <i class="fab fa-gitlab icon"></i>
                    <h4>GitLab</h4>
                    <p>Lorem Ipsum is simply dummy text </p>
                    <div class="background_hover"> </div>
                </div>

                <div class="box">
                    <i class="fab fa-linkedin-in icon"></i>
                    <h4>Linkedin</h4>
                    <p>Lorem Ipsum is simply dummy text </p>
                    <div class="background_hover"> </div>
                </div> */}

            </div>
        </div>
    )
}

export default admin
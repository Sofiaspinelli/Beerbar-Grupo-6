import React from 'react'

function Footer() {
  return (
    <footer>
    <section>
        <p> <a href="https://twitter.com/"> <i className="fa-brands fa-twitter"></i></a>

            <a href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://web.whatsapp.com/"><i className="fa-brands fa-whatsapp-square"></i></a>
        </p>
    </section>
    <section className="contenedor">
        <article><a href="/products">Nuestros Productos</a> </article>
        <article><a href="/empresa">Empresa</a> </article>
        <article><a href="http://patagoniaar20220118.abinbev.acsitefactory.com/sites/g/files/wnfebl3746/files/2022-01/TyC%20-%20Patagonia.pdf" target="_blank"> Terminos y condiciones</a></article>
        <article><a href="http://patagoniaar20220118.abinbev.acsitefactory.com/sites/g/files/wnfebl3746/files/2022-01/Pol%C3%ADtica%20de%20Privacidad%20-%20Patagonia.pdf" target="_blank">Politicas de privacidad</a></article>
    </section>
    <section className="contenedor_2">
        <article><a href="">ayuda</a></article>
        <article><a href="/" className="boton-contactoPie">Contacto</a></article>
    </section>
    <section>
        <article>Beber con moderacion. Prohibida su venta a menores de 18 años. No comparta el contenido con
            menores. 2021 BEER&BAR</article>
        <span className="copyright">Copyright © beer&bar</span>
    </section>

</footer>
  )
}

export default Footer
window.addEventListener('load', () => {
    console.log('menu conectado')
    const $ = (e) => document.querySelector(e);

    const menu = $('#menu');
    const nav = $('nav')
    const miPerfil = $('#miPerfil')
    const opciones = $('#opcionesPerfil')

    menu.addEventListener('click', () => {
        console.log('click en menu')
        nav.classList.toggle('desaparecer')
    })

    miPerfil.addEventListener('click', () => {
        console.log('click en perfil')
        opciones.classList.toggle('blockOption')
    })

})
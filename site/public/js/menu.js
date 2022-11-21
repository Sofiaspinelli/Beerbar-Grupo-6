window.addEventListener('load', () => {
    console.log('menu conectado')
    const $ = (e) => document.querySelector(e);

    const menu = $('#menu');
    const nav = $('nav')

    menu.addEventListener('click', () => {
        console.log('click en menu')
        nav.classList.toggle('desaparecer')
    })
})
const openModal = document.querySelector('.boton-contacto')
const openModalPie = document.querySelector('.boton-contactoPie')
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.modal__close')

openModal.addEventListener('click', (e) => {
    e.preventDefault()
    modal.classList.add('modal--show')

})
openModalPie.addEventListener('click', (e) => {
    e.preventDefault()
    modal.classList.add('modal--show')

})

closeModal.addEventListener('click', (e) => {
    e.preventDefault()
    modal.classList.remove('modal--show')
    
})
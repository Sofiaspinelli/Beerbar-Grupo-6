
window.addEventListener('load', () => {
    console.log("conectado contacto")
    const $ = (element) => document.querySelector(element);
    const x = (element) => document.querySelectorAll(element);
    
    const funcValidate = (obj) => {
        let arr = Object.values(obj)
        console.log(arr);
        if (!arr.includes(false)) {
            btn.disabled = false
            btn.style.backgroundColor = 'black'
        }else{
            btn.disabled = true
            btn.style.backgroundColor = 'red'
        }
    }

    const nombre = $('#name');
    const email = $('#email');
    const contacto = $('#contacto');
    const areatext = $('#textarea');


    const btn = $('#btn_submit');

    /* Expresiones regulares para utilizar */
    let regExLetter = /^[a-zA-Z\sñáéíóúü]*$/
    let regExNumber = /^[+]?([0-9][0-9]?|150)$/
    const regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/
    const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    const regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    nombre.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#nombreError').innerHTML = 'Debe ingresar su nombre'
                this.classList.add('is-invalid')
                validate.nombre = false
                
                break;
            case !regExLetter.test(nombre.value):
                $('#nombreError').innerHTML = 'Solo puede usar letras'
                this.classList.add('is-invalid')
                validate.nombre = false
                
                break;

            case !(this.value.trim().length >= 3 && this.value.trim().length < 50):
                $('#nombreError').innerHTML = 'Debe ingresar el nombre con un min de 3 caracteres'
                this.classList.add('is-invalid')
                validate.nombre = false
                break;
        
            default:
                $('#nombreError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.nombre = true
                break;
        }
        funcValidate(validate)
    })
    email.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#emailError').innerHTML = 'Debe ingresar su email'
                this.classList.add('is-invalid')
                validate.email = false
                break;
            case !regExEmail.test(email.value):
                $('#emailError').innerHTML = 'Debe ingresar un mail valido'
                this.classList.add('is-invalid')
                validate.email = false
                break;
        
            default:
                $('#emailError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.email = true
                break;
        }
        funcValidate(validate)
    })
    contacto.addEventListener('blur', function() {
        switch (true) {
            case regExNumber.test(this.value):
                $('#contactoError').innerHTML = 'Debe ingresar un nro de contacto valido'
                
                this.classList.add('is-invalid')
                validate.contacto = false
                
                break;
        
            default:
                $('#contactoError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.contacto = true
                break;
        }
        funcValidate(validate)
    })
    areatext.addEventListener('blur', function() {
        switch (true) {
            case !this.value:
                $('#textareaError').innerHTML = 'Debe ingresar su mensaje'
                this.classList.add('is-invalid')
                validate.areatext = false
                
                break;
        
            default:
                $('#textareaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.areatext = true
                break;
        }
        funcValidate(validate)
    })


    /* Validacion */
    const validate = {
        nombre : false,  
        email : false ,
        contacto : false ,
        areatext: false,
    }

    funcValidate(validate)
})
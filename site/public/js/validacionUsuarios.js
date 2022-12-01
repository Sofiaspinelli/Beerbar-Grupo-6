
window.addEventListener('load', () => {
    // console.log("conectado")
    const $ = (element) => document.querySelector(element);
    const x = (element) => document.querySelectorAll(element);
    // const db = require('../../src/database/models');
    
    
    const funcValidate = (obj) => {
        let arr = Object.values(obj)
        console.log(arr);
        if (!arr.includes(false)) {
            btn.disabled = false
            btn.style.backgroundColor = '#1a78fd'
        }else{
            btn.disabled = true
            btn.style.backgroundColor = 'red'
        }
    }
   
//    let usuarios = ( db.users.findall()
//     .then(usuario => usuario.email)
//     .cath(error => res.status(500).sent(error)))

//     console.log(usuarios)

    const nombre = $('#name');
    const apellido = $('#apellido');
    const email = $('#email');
    const pass = $('#pass');
    const pass2 = $('#pass2');
    const contacto = $('#contacto');
    const genero = x('.genero');
    const iconEye = $('.icon-eye')
    
    const img = $('#image');

    const terminos = $('#terminos');

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
    apellido.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#apellidoError').innerHTML = 'Debe ingresar su apellido'
                this.classList.add('is-invalid')
                validate.apellido = false
                break;
            case !regExLetter.test(apellido.value):
                $('#apellidoError').innerHTML = 'Solo puede usar letras'
                this.classList.add('is-invalid')
                validate.apellido = false
                
                break;
            case !(this.value.trim().length >= 5 && this.value.trim().length < 70):
                $('#apellidoError').innerHTML = 'Debe ingresar el nombre con un min de 5 caracteres'
                this.classList.add('is-invalid')
                validate.apellido = false
                break;
        
            default:
                $('#apellidoError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.apellido = true
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
            case this.value:
                $('#emailError').innerHTML = 'El mail que ingreso ya existe'
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
    pass.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#passError').innerHTML = 'Debe ingresar una contraseña'
                this.classList.add('is-invalid')
                validate.pass = false
                break;
            case !regExPass.test(pass.value):
                $('#passError').innerHTML = 'La contraseña debe tener entre 6 y 12 caracteres y debe contener una mayuscula, una minuscula y un numero'
                this.classList.add('is-invalid')
                validate.pass = false
                break;
        
            default:
                $('#passError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.pass = true
                break;
        }
        funcValidate(validate)
    })
    pass2.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#pass2Error').innerHTML = 'Debe repetir su contraseña'
                this.classList.add('is-invalid')
                validate.pass2 = false
                break;
            case this.value != pass.value:
                $('#pass2Error').innerHTML = 'No coinciden las contraseñas'
                this.classList.add('is-invalid')
                validate.pass2 = false
                break;
        
            default:
                $('#pass2Error').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.pass2 = true
                break;
        }
        funcValidate(validate)
    })
    iconEye.addEventListener("click",function() {
        const icon = this.querySelector("i");
        
        if (this.nextElementSibling.type === "password"){
            this.nextElementSibling.type = "text";
            icon.classList.remove("fa-solid fa-eye-slash")
            icon.classList.add("fa-sharp fa-solid fa-eye")
        }else {
            this.nextElementSibling.type = "password"
            icon.classList.remove("fa-sharp fa-solid fa-eye")
            icon.classList.add("fa-solid fa-eye-slash")
        }
    })

    contacto.addEventListener('blur', function() {
        switch (true) {
            case !this.value:
                $('#contactoError').innerHTML = 'Debe ingresar su nro de contacto'
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

    genero.forEach(genre => {
        genre.addEventListener('click', function() {
            switch (true) {
                case !this.value:
                    $('#generoError').innerHTML = 'Debe elegir una opcion'
                    this.classList.add('is-invalid')
                    validate.genero = false
                    break;
            
                default:
                    $('#generoError').innerHTML = null
                    this.classList.remove('is-invalid')
                    this.classList.add('is-valid')
                    validate.genero = true
                    break;
            }
            funcValidate(validate)
        })
    })
    
   

    img.addEventListener('change', function() {
        switch (true) {
            case !regExExt.exec(img.value):
                $('#imgError').innerHTML = "Solo se permite ingresar una imagen valida fomato (jpg|jpeg|png|jfif|gif|webp)"
                validate.img = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.img = true
                break;
        }
        funcValidate(validate)
    })

    terminos.addEventListener('click', function() {
        switch (true) {
            case !this.checked:
                $('#terminosError').innerHTML = 'Debe aceptar los terminos y condiciones'
                this.classList.add('is-invalid')
                validate.pass2 = false
                break;
        
            default:
                $('#terminosError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.terminos = true
                break;
        }
        funcValidate(validate)
    })

    /* Validacion */
    const validate = {
        nombre : false,
        apellido : false,
        email : false ,
        pass : false ,
        pass2 : false ,
        contacto : false ,
        genero : false ,
        img : true ,
        terminos : false 
        
    }

    funcValidate(validate)
})
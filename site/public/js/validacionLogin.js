
window.addEventListener('load', () => {
    console.log('login script');
    const $ = (e) => document.querySelector(e);

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
    

    const form = $('form');

    // console.log(form);
    const email = $('#email');
    const pass = $('#pass');

    const btn = $('#btn-login');
    const iconEyeL = $('#icon-eye')

    const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    const regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let user = []
    const traerUsuario = async () => {
        let response = await fetch('http://localhost:3005/api/users')
        result = await response.json();
        user = result.data
        // console.log(user);
    }
    traerUsuario()
    
 
    iconEyeL.addEventListener("click",function() {
        const icon = $("#icon-l");
        
        if (pass.type === 'password'){
            pass.type = 'text';
            console.log('click')
            icon.classList.remove('fa-eye-slash')
            icon.classList.add('fa-eye')
        }else {
            pass.type = 'password'
            icon.classList.remove('fa-eye')
            icon.classList.add('fa-eye-slash')
            console.log('click2')
        }
    })

    let userID = 0
    email.addEventListener('blur', function() {

        // user.forEach(dato => {})
        let usuario = user.filter(dato => dato.email == email.value? dato : null)
            // console.log(usuario[0]);
            if (usuario[0] !== undefined) {
                userID = usuario[0].id
                console.log(userID);
            }else {
                userID = 0
            }
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
                case usuario[0] === undefined:
                         $('#emailError').innerHTML = 'El email ingresado no existe'
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
            
        // fetch(`http://localhost:3000/api/users/login/${userID}`)
        // .then(response => response.json())
        // .then(dato => {
        //     console.log(dato);
                // console.log(check(this.value, dato.data.pass));

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
            // console.log(pass.value);
        // })

        funcValidate(validate)
    })


     /* Validacion */
     const validate = {
        email : false ,
        pass : false ,
    }

    
    funcValidate(validate)

   
})
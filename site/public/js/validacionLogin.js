
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
    email.addEventListener('blur', function() {

        fetch('http://localhost:3005/api/users')
        .then(response => response.json())
        .then(dato => {
            dato.data.forEach(users => {
                // console.log(users)
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
                    case this.value.trim() != users.email:

                            console.log(users.email)
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
                    
                
            })
        })
        .catch((err) => console.log(err))
        
        funcValidate(validate)
    })
    pass.addEventListener('blur', function() {

        fetch('http://localhost:3005/api/users')
        .then(response => response.json())
        .then(dato => {
            dato.data.forEach(users => {
                // console.log(users.email)

                switch (true) {
                    case !this.value.trim():
                        $('#passError').innerHTML = 'Debe ingresar una contraseña'
                        this.classList.add('is-invalid')
                        validate.pass = false
                        break;
                    // case !bcryptjs.compareSync(this.value, users.pass) && (email.value === users.email):
                    //     $('#passError').innerHTML = 'La contraseña es incorrecta'
                    //     this.classList.add('is-invalid')
                    //     validate.pass = false
                    //     break;
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
            })
        })

        
        funcValidate(validate)
    })


     /* Validacion */
     const validate = {
        email : false ,
        pass : false ,
    }

    funcValidate(validate)

   
})
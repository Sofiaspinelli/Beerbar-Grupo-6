window.addEventListener('load', () => {
    const $ = (element) => document.querySelector(element);

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
   
    const type = $('#selectType')
    const nombre = $('#nombre')
    const marca = $('#marca')
    const detalle = $('#descripcion')
    const precio = $('#precio')
    const descuento = $('#descuento')
    const stock = $('#stock')
    const categoria = $('#categoria')
    const img = $('#img')

    const btn = document.getElementById('btn-valid')
    console.log(btn)

    /* Expresiones regulares para utilizar */
    let regExLetter = /^[a-zA-Z\sñáéíóúü]*$/
    let regExNumber = /^[+]?([0-9][0-9]?|150)$/
    const regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/

    type.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#typeError').innerHTML = 'funciona el error validation'
                this.classList.add('is-invalid')
                validate.type = false
                break;
        
            default:
                $('#typeError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.type = true
                break;
        }
        funcValidate(validate)
    })
    nombre.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#nameError').innerHTML = 'Debe ingrsar un nombre'
                this.classList.add('is-invalid')
                validate.type = false
            
                break;

            case !(this.value.trim().length >= 5 && this.value.trim().length < 50):
                $('#nameError').innerHTML = 'Debe ingresar el nombre con un min de 5 y max 50 caracteres'
                this.classList.add('is-invalid')
                validate.nombre = false
                break;
        
            default:
                $('#nameError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.nombre = true
                break;
        }
        funcValidate(validate)
    })
    marca.addEventListener('blur', function() {
        switch (true) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    detalle.addEventListener('blur', function() {
        switch (true) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    precio.addEventListener('blur', function() {
        switch (true) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    descuento.addEventListener('blur', function() {
        switch (true) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    stock.addEventListener('blur', function() {
        switch (true) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    categoria.addEventListener('blur', function() {
        switch (true) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
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

    /* Validacion */
    const validate = {
        type : false,
        nombre : false,
        marca : true ,
        detalle : false ,
        precio : false ,
        descuento : false ,
        stock : false ,
        categoria : true ,
        img : true 
    }
});
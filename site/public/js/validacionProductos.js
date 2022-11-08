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
            case !this.value.trim():
                $('#marcaError').innerHTML = "Debes ingresar una marca"
                this.classList.add('is-invalid')
                validate.marca = true       
                break;

                default:
                $('#marcaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.marca = true

                break;
            
        } 
        funcValidate(validate)
    })
    detalle.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#detalleError').innerHTML = "Debes ingresar el detalle del producto"
                this.classList.add('is-invalid')
                validate.detalle = false
                break;
                case !(this.value.trim().length >= 10 && this.value.trim().length <= 200):
                    $('#detalleError').innerHTML = "El detalle del producto debe contener min 10 y max 200 caracteres"
                    this.classList.add('is-invalid')
                    validate.detalle = false
                    break;

                default:
                    $('#detalleError').innerHTML = null
                    this.classList.remove('is-invalid')
                    this.classList.add('is-valid')
                    validate.detalle = true
                    break;
        }
        funcValidate(validate)
    })
    precio.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#precioError').innerHTML = "Ingresá el precio"
                this.classList.add('is-invalid')
                validate.precio = false
                break;
            case !(this.value.trim().length >= 2 && this.value.trim().length <= 14):
                $('#precioError').innerHTML = "El precio debe contener 2 caracteres y maximo 10"
                this.classList.add('is-invalid')
                validate.precio = false
                break;
            default:
                $('#precioError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.precio = true
                break;
        }
        funcValidate(validate)
    })
    descuento.addEventListener('blur', function() {
        switch (true) {
            case !(this.value.trim().length <= 2):
                $('#descuentoError').innerHTML = "El descuento no debe ser mayor a 2 cifras"
                this.classList.add('is-invalid')
                validate.descuento = false
                break;
            default:
                $('#descuentoError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.descuento = true
                break;
        }
        funcValidate(validate)
    })
    stock.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#stockError').innerHTML = "Debes ingresar el stock de tu producto"
                this.classList.add('is-invalid')
                validate.stock = false
                break;

            case !regExNumber.test(this.value.trim()):
                $('#stockError').innerHTML = "Debes ingresar un numero menor a 100"
                this.classList.add('is-invalid')
                validate.stock = false
                break;

            case !(this.value.trim().length >= 1 && this.value.trim().length <= 50):
                $('#stockError').innerHTML = "El stock del producto debe contener 1 caracteres y maximo 50"
                this.classList.add('is-invalid')
                validate.stock = false
                break;    

            default:
                $('#stockError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.stock = true
                break;
        }
        funcValidate(validate)
    })
    categoria.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#categoriaError').innerHTML = "Debes ingresar una de las categoria"
                this.classList.add('is-invalid')
                validate.categoria = false
                break;
            
            default:
                $('#categoriaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.categoria = true
                break;
        }
        funcValidate(validate)
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
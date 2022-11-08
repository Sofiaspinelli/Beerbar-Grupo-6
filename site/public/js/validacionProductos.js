window.addEventListener('load', () => {
    const $ = (element) => document.querySelector(element);

   
    const type = $('#selectType')
    const nombre = $('#nombre')
    const marca = $('#marca')
    const detalle = $('#descripcion')
    const precio = $('#precio')
    const descuento = $('#descuento')
    const stock = $('#stock')
    const categoria = $('#categoria')
    const img = $('#img')

    console.log(type)

    /* Expresiones regulares para utilizar */
    let regExLetter = /^[a-zA-Z\sñáéíóúü]*$/
    let regExNumber = /^[+]?([0-9][0-9]?|150)$/
    const regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/

    type.addEventListener('blur', function() {
        switch (key) {
            case value:
                
                break;
                
            case value:
                
                break;
        
            default:
                break;
        }
    })
    nombre.addEventListener('blur', function() {
        switch (key) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    marca.addEventListener('blur', function() {
        switch (key) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    detalle.addEventListener('blur', function() {
        switch (key) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    precio.addEventListener('blur', function() {
        switch (key) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    descuento.addEventListener('blur', function() {
        switch (key) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    stock.addEventListener('blur', function() {
        switch (key) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
    })
    categoria.addEventListener('blur', function() {
        switch (key) {
            case value:
                
                break;

            case value:
                
                break;
        
            default:
                break;
        }
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
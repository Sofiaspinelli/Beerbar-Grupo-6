const $ = (tag) => document.querySelector(tag);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const iconCart = $('#cart-btn')
const cart = $('.cart-container')

const carrito = $('#carrito')
const h2 = $('#titulo')
const iconoCarrito = $('#cart-btn')



const getVentanaCart = async () => {
    try {

        const response = await fetch('http://localhost:3005/api/carrito')
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
        }
        
    } catch (error) {
        console.log(error);
    }
}

const getCart = async () => {
    try {

        const response = await fetch('http://localhost:3005/api/carrito/')
        const result = await response.json()

        if (result.status === 200) {
            cargarCarrito(result.data)
            console.log(result.data)
        }

    } catch (error) {
        console.log(error);
    }
}


const addItem = async (id) => {
    try {

        // let numero = {
        //     cantidad: count !== undefined ? count.value : 1
        // }

        console.log('ingreso');
        const response = await fetch(`http://localhost:3005/api/carrito/${id}`, {
            method: 'POST',
            // body: JSON.stringify(numero),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await response.json()
        console.log(result.data);

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error);
    }
}



const removeItem = async (id) => {
    try {
        
        const response = await fetch(`http://localhost:3005/api/carrito/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error);
    }
}

const modifyItem = async (id) => {
    try {
        console.log('ingreso');
        const response = await fetch(`http://localhost:3005/api/carrito/item/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error);
    }
}

const empty = async (id) => {
    try {



    } catch (error) {
        console.log(error)
    }
}

// pintar en el DOM la información del carrito
const cargarCarrito = (data) => {

    carrito.innerHTML = "";
    console.log(data)

    if (data.length > 0) {

        let totalCarrito = 0
        let cantidad = 0

        data.forEach(producto => {
            let item = `
            <article class="contGen">
                <div class="contGrid">
                    <div class="producto">
                    <div class="detalle">
                        <div class="imgcCont">
                            <img src="/img/productos/${producto.imagen}" alt="${producto.nombre}">
                        </div>
                        <div class="contenido">
                            <h2>${producto.nombre}</h2>
                            <p>${producto.detalle}</p>
                        </div>
                    </div>
                        <div class="info">
                        ${ producto.descuento > 0 ? 
                            `<p class="precio">$ ${toThousand(Math.round(producto.precio - (producto.precio * producto.descuento / 100)))}</p>
                            <h3>${producto.descuento}% OFF</h3>`
                            :
                            `<p class="precio">$ ${producto.precio}</p>`
                        }
                            <div class="cantidad">
                                <button class="button" id="decrease" onClick="modifyItem('${producto.id}')">-</button>
                                <span>${producto.cantidad}</span>
                                <button class="button button2" id="increase" onClick="addItem('${producto.id}')">+</button>
                            </div>
                            <button class="trash" onClick="removeItem('${producto.id}')"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                </div>
                </article>
            `
            carrito.innerHTML += item
            totalCarrito += producto.subtotal
            cantidad += producto.cantidad
        });

        $('#subTotal').innerHTML = `<h3>SUBTOTAL:</h3> $ ${toThousand(Math.round(totalCarrito))}`
        $('#total').innerHTML = `<h2>TOTAL:</h2> $ ${toThousand(Math.round(totalCarrito))}`
        h2.innerHTML = `Carrito (${cantidad})`
    } else {
        $('.end').classList.add('none')
        h2.innerHTML = `Carrito (0)`
        carrito.innerHTML = `
        <article class="vacio">
            <div>
                <h4>Su carrito está vacio</h4>
                <a href="/products">Elegir productos</a>
            </div>
        </article>
        `
    }

}

const cargarVentanaCarrito = (data) => {
    console.log("Se cargaron los datos")
    //console.log(data)
    cart.innerHTML = ""

    let cantidad = []

    if (data.length > 0) {
        let totalCarrito = 0

        data.forEach(producto => {
           
            let item = `
            <div class="cart-item">
                <span class="fas fa-times" onClick="removeItem('${producto.id}')"></span>
                <img src="/img/productos/${producto.imagen}"  alt="">
                <div class="content">
                    <h3>${producto.nombre}</h3>
                    <div class="price">$ ${toThousand(Math.round(producto.precio - (producto.precio * producto.descuento / 100)))}</div>
                    <div class="añadir-elementos">
                        <button class="restar" onClick="modifyItem('${producto.id}')">-</button>
                        <span ">${producto.cantidad}</span>
                        <button class="agregar" onClick="addItem('${producto.id}')">+</button>
                    </div>
                </div>
            </div>
            `
            cart.innerHTML += item
            totalCarrito += producto.subtotal
            cantidad.push(producto.cantidad)
        })
        
        iconoCarrito.innerHTML += `<span class="count">${cantidad.reduce((a, b) => a + b)}</span>`
        
        cart.innerHTML += `
        <div class="cart-puy">
            <span>Subtotal:</span>
            <span>$ ${toThousand(Math.round(totalCarrito))}</span>
            <a class="" href="/products/cart">Ir a mi carrito</a>
        </div>
        `
    } else {
        cantidad = []
        iconoCarrito.innerHTML += ``
        cart.innerHTML = `
            <h3 class="title">Mi carrito</h3>
            <p>Carrito vacio</p>
        `

    }

}


iconCart && iconCart.addEventListener('click', () => {
    cart.classList.toggle('active');
})

// cuando exista carrito(inicamente en la vista de carrito) se ejecutara la función getCarrito()
carrito && getCart()

// cuando exista el icono de carrito en el DOM se ejecuta la función de cargarVentanaCarrito()
iconCart && getVentanaCart()


/* <article>
                <div class="imagenes">
                    <img id="img" src="/images/productos/${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="detail">
                    <h4><a id="nombre" href="/products/detail/${producto.id}">${producto.nombre}</a></h4>
                    <div class="añadir-elementos">
                        <button class="restar" onClick="modifyItem('${producto.id}')">-</button>
                        <span ">${producto.cantidad}</span>
                        <button class="agregar" onClick="addItem('${producto.id}')">+</button>
                    </div>
                    <div class="precio-descuento">
                        <p id="precio-sin-descuento" class="precio-secundario">$ ${toThousand(Math.round(producto.precio))}
                            <span id="descuento">${producto.descuento}%</span>-
                        </p>
                        <p id="precio-con-descuento" class="precio-principal">$  ${toThousand(Math.round(producto.precio - (producto.precio * producto.descuento / 100)))}</p>
                    </div>
                </div>
                <button class="eliminar-item" onClick="removeItem('${producto.id}')"><i class="fas fa-times"></i></button>
            </article> */
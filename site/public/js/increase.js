    console.log('increase conectado');
    // const $ = (e) => document.querySelector(e);

    const increase = $('#increase');
    const decrease = $('#decrease');
    const count = $('#count');
    const stock = $('#stock');

    let contador = 1
    stock.style.display = 'none';
    max = stock.value
    console.log(max)

    function sumar() {
        if (contador < max) {
            contador++;
        }
        return count.value = contador;
    }
    function restar() {
        if (contador > 1) {
            contador--;
        }
        return count.value = contador;
    }

    const addItem2 = async (id) => {
        try {
    
            let numero = {
                cantidad: count !== undefined ? count.value : 1
            }
    
            console.log('ingreso');
            const response = await fetch(`http://localhost:3005/api/carrito/${id}`, {
                method: 'POST',
                body: JSON.stringify(numero),
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

    increase.addEventListener('click', () => {
        sumar()
        // cantidad(1, count.value);
    })

    decrease.addEventListener('click', () => {
        restar();
    })

    const Añadir = (dato) => {
        addItem2(dato)
        alert('Producto añadido al carrito')
    }


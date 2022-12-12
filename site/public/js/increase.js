window.addEventListener('load', () => {
    console.log('increase conectado');
    const $ = (e) => document.querySelector(e);

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

    const cantidad = async (id, nro) => {
        try {
            let response = await fetch(`http://localhost:3005/api/contador/${id}/${nro}`)
            let result = await response.json()
            console.log(result);
            
            // return count.value = result.data;

        } catch (error) {
            console.log(error);
        }
    }


    increase.addEventListener('click', () => {
        sumar()
        cantidad(1, count.value);
    })

    decrease.addEventListener('click', () => {
        restar();
        cantidad(1, count.value)
    })

})
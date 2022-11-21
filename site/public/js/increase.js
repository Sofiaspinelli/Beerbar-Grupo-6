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

    increase.addEventListener('click', () => {
        sumar();
    })

    decrease.addEventListener('click', () => {
        restar();
    })

})
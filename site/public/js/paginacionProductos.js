window.addEventListener('load', () => {
    console.log('conection on');

    const $ = (e) => document.querySelector(e);

    const url = new URL('http://localhost:3005/api/productos?page=1&size=6');

    // const filter = $('#filter');
    // const sizes = $('#size');
    const ulPages = $('#pages-links');
    const section = $('#productos');
    const template = document.querySelector('#template-products').content;
    const fragment = document.createDocumentFragment();

    // const errorMsg = $('#msgResult');

    // filter.addEventListener('change', (e) => {
    //     if (e.target.value.trim().length != 0) {
    //         console.log('Ingreso 1');
    //         console.log(url.href);

    //         if (url.searchParams.has(e.target.name)) {

    //             if (e.target.name != 'nombre' && e.target.value == 0) {
    //                 url.searchParams.delete(e.target.name);

    //             } else {
    //                 url.searchParams.set(e.target.name, e.target.value);
    //             };

    //         } else {
    //             url.searchParams.append(e.target.name, e.target.value);
    //         };

    //         tbody.innerHTML = "";
    //         traerDatos(url.href);

    //     } else {
    //         console.log('Ingreso 2');
    //         console.log(url.href);

    //         if (url.searchParams.has(e.target.name)) {
    //             url.searchParams.delete(e.target.name);
    //             tbody.innerHTML = "";
    //             traerDatos(url.href);
    //         }
    //         url.searchParams.delete(e.target.name);
    //     };
    // });

    // sizes.addEventListener('change', (e) => {
    //     url.searchParams.set(e.target.name, e.target.value);
    //     tbody.innerHTML = "";
    //     traerDatos(url.href);  
    // });

    ulPages.addEventListener('click', (e) => {

        e.preventDefault();

        if (!e.target.classList.contains('disabled')) {
            section.innerHTML = "";
            traerDatos(e.target.href); 
        }
    });

    // Función 'traerDatos' recibe una url por parametro
    // Se encarga de hacer la petición a la API y dependiendo de los resultados pinta en el DOM los resultados

    const traerDatos = async (url) => {
        try {
            let response = await fetch(url);
            let result = await response.json();

            if (result.count > 0) {

                // errorMsg.innerHTML = "";

                console.log('tus resultados');
                console.log(result.result);

                result.result.forEach(producto => {
                    template.querySelector('#id').innerHTML = `<a href="/products/detail/${producto.id}">Comprar</a>`;
                    template.querySelector('#imgPoducts').src = `/img/productos/${producto.imagenes[0].name}`
                    template.querySelector('#nombre').innerHTML = `${producto.nombre}`;
                    template.querySelector('#precio').innerHTML = `$ ${producto.precio - (producto.precio * producto.descuento / 100)} ${producto.descuento > 0 ? `<small class="descuento" id="descuento">${producto.descuento}%</small>` : ''}`;
                    // template.querySelector('#descuento').innerHTML = `${producto.descuento}`;
                    template.querySelector('#oldprecio').innerHTML = `${producto.descuento > 0? producto.precio : '' }`;

                    const clone = template.cloneNode(true);
                    fragment.appendChild(clone);
                });
                console.log(fragment);
                section.appendChild(fragment);

                ulPages.innerHTML = "";

                if (result.previous != null) {
                    ulPages.innerHTML += `<li class="page-item previousItem"><a class="page-link" href="${result.previous}">Previous</a></li>`;
                } else {
                    ulPages.innerHTML += `<li class="page-item disabled previousItem"><a class="page-link" href="">Previous</a></li>`;
                };

                if (result.pages > 2) {
                    for (let i = 1; i < result.pages + 1; i++) {
                        let link = new URL(url);
                        
                        if (link.searchParams.get('page') == i) {
                            link.searchParams.set('page', i);
                            ulPages.innerHTML += `<li class="page-item disabled"><a class="page-link" href="${link.href}">${i}</a></li>`;
                        } else {
                            link.searchParams.set('page', i);
                            ulPages.innerHTML += `<li class="page-item"><a class="page-link" href="${link.href}">${i}</a></li>`;
                        };
                    };
                };

                if (result.next != null) {
                    ulPages.innerHTML += `<li class="page-item nextItem"><a class="page-link" href="${result.next}">Next</a></li>`;
                } else {
                    ulPages.innerHTML += `<li class="page-item disabled nextItem"><a class="page-link" href="">Next</a></li>`;
                };

                

            } else {
                console.log('no se encontraron resultados');

                errorMsg.innerHTML = '<h1>no se encontraron resultados</h1>';
                
            };
        } catch (error) {
            console.log(error);
        };
    };
    traerDatos(url.href);
})


/* 
<% products.forEach(producto => { %>
    <article>
        <img src="/img/productos/<%= producto.imagenes[0].name %>" alt="">
          <div class="contenedor">
            <h3><%= producto.nombre %></h3>
            <% if (producto.descuento > 0) { %>
            <p class="old">$<%= producto.precio %> </p>
            <p class="precio">$<%= producto.precio - (producto.precio * producto.descuento / 100) %> <small class="descuento"><%= producto.descuento %>%</small>
            <p>
            <% }else { %>
            <p class="precio">$<%= producto.precio %> </p>
            <% } %>
          </div>
        <button><a href="/products/detail/<%= producto.id %>">Comprar</a></button>
    </article>
<% }) %>
*/
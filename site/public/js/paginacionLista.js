window.addEventListener('load', () => {
    console.log('conection on');

    const $ = (e) => document.querySelector(e);

    const url = new URL('http://localhost:3005/api/productos?page=1&size=10');

    const filter = $('#filter');
    const sizes = $('#size');
    const ulPages = $('#pages-links');
    const tbody = $('#tbody');
    const template = document.querySelector('#tempale-tbody').content;
    const fragment = document.createDocumentFragment();

    const errorMsg = $('#msgResult');

    filter.addEventListener('change', (e) => {
        if (e.target.value.trim().length != 0) {
            console.log('Ingreso 1');
            console.log(url.href);

            if (url.searchParams.has(e.target.name)) {

                if (e.target.name != 'nombre' && e.target.value == 0) {
                    url.searchParams.delete(e.target.name);

                } else {
                    url.searchParams.set(e.target.name, e.target.value);
                };

            } else {
                url.searchParams.append(e.target.name, e.target.value);
            };

            tbody.innerHTML = "";
            traerDatos(url.href);

        } else {
            console.log('Ingreso 2');
            console.log(url.href);

            if (url.searchParams.has(e.target.name)) {
                url.searchParams.delete(e.target.name);
                tbody.innerHTML = "";
                traerDatos(url.href);
            }
            url.searchParams.delete(e.target.name);
        };
    });

    sizes.addEventListener('change', (e) => {
        url.searchParams.set(e.target.name, e.target.value);
        tbody.innerHTML = "";
        traerDatos(url.href);  
    });

    ulPages.addEventListener('click', (e) => {

        e.preventDefault();

        if (!e.target.classList.contains('disabled')) {
            tbody.innerHTML = "";
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

                errorMsg.innerHTML = "";

                console.log('tus resultados');
                console.log(result.result);

                result.result.forEach(producto => {
                    template.querySelector('#id').innerHTML = `<a href="/products/detail/${producto.id}">${producto.id}</a>`;
                    template.querySelector('#nombre').innerHTML = `<a href="/products/detail/${producto.id}">${producto.nombre}</a>`;
                    template.querySelector('#tipo').innerHTML = `<a href="/products/detail/${producto.id}">${producto.tipos.name}</a>`;
                    template.querySelector('#marca').innerHTML = `<a href="/products/detail/${producto.id}">${producto.marca == 'nada' || producto.marca == '' || producto.marca == 'marca' ? '-----' : producto.marca}</a>`;
                    template.querySelector('#precio').innerHTML = `<a href="/products/detail/${producto.id}">${producto.precio}</a>`;
                    template.querySelector('#descuento').innerHTML = `<a href="/products/detail/${producto.id}">${producto.descuento}</a>`;
                    template.querySelector('#stock').innerHTML = `<a href="/products/detail/${producto.id}">${producto.stock - producto.vendidos}</a>`;
                    template.querySelector('#btn-eliminar').action = `/admin/eliminar/${producto.id}?_method=DELETE`;
                    template.querySelector('#btn-editar').href = `/admin/editar/${producto.id}`;

                    const clone = template.cloneNode(true);
                    fragment.appendChild(clone);
                });
                console.log(fragment);
                tbody.appendChild(fragment);

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
<% products.forEach(producto=> { %>
    <tr>        
        <th scope="row"><a href="/products/detail/<%= producto.id %>"><%= producto.id %> </a></th>
        <td><a href="/products/detail/<%= producto.id %>"><%= producto.nombre %></a></td>
        <td><a href="/products/detail/<%= producto.id %>"><%= producto.tipos.name %></a></td>
        <td><a href="/products/detail/<%= producto.id %>"><%= producto.marca == 'nada' || producto.marca == '' || producto.marca == 'marca' ? '-----' : producto.marca %></a></td>
        <td><a href="/products/detail/<%= producto.id %> "><%= producto.stock - producto.vendidos %></a></td>
        <td><a href="/products/detail/<%= producto.id %> "><%= producto.precio %></a></td>
        <td><a href="/products/detail/<%= producto.id %> "><%= producto.descuento %></a></td>
        <td class="td-buttom">
        <form class="trashForm" action="/admin/eliminar/<%= producto.id %>?_method=DELETE" method="post" >
        <button type="submit" class="trash"><i class="fa-solid fa-trash-can icon"></i></button>
        </form> 

        <button class="edit"> 
        <a href="/admin/editar/<%= producto.id %> "><i class="fa-solid fa-pen-to-square icon"></i> </a>
        </button></a></td>
    </tr>
<% }) %>
*/
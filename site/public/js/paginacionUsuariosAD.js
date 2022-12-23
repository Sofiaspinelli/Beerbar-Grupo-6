window.addEventListener('load', () => {
    console.log('coneccion establecida paginacion');

    const $ = (e) => document.querySelector(e);

    const url = new URL('http://localhost:3005/api/users/paginado?page=1&size=5');

    const filter = $('#filter');
    // const sizes = $('#size');
    const ulPages = $('#pages-links');
    const tbody = $('#tbody');
    const template = document.querySelector('#tempalte-tbody').content;
    const fragment = document.createDocumentFragment();

    const userlist = $('#btn-Userlist');
    // const rolBtn = $('#btn-rol');
    // console.log(userlist);
    const listaUsuarios = $('#listaUsuarios');

    // console.log(rolBtn);
    // const userRols = $('#userRols');

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

    // sizes.addEventListener('change', (e) => {
    //     url.searchParams.set(e.target.name, e.target.value);
    //     tbody.innerHTML = "";
    //     traerDatos(url.href);  
    // });

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

                result.result.forEach(usuario => {
                    template.querySelector('#id').innerHTML = `${usuario.id}`;
                    template.querySelector('#nombre').innerHTML = `${usuario.nombre}`
                    template.querySelector('#apellido').innerHTML = `${usuario.apellido}`;
                    // template.querySelector('#email').innerHTML = `${usuario.email}`;
                    // template.querySelector('#contacto').innerHTML = `${usuario.contacto}`;
                    template.querySelector('#rol').innerHTML = `${usuario.rol.title}`;
                    // template.querySelector('#btn-eliminar').action = `/admin/user/eliminar/${usuario.id}?_method=DELETE`;
                    template.querySelector('#editar-form').action = `/admin/user/editar/${usuario.id}?_method=PUT`;

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

    userlist.addEventListener('click',() => {
        console.log('hiciste click bb');
        listaUsuarios.classList.toggle('displayClass')
    }
    )
    $('#btn-cerrar').addEventListener('click', () => {
        listaUsuarios.classList.remove('displayClass')
    })
    // rolBtn.addEventListener('click',() => {
    //     console.log('hiciste click bbx2');
    //     userRols.classList.toggle('displayClass')
    // }
    // )
})



/* 

*/
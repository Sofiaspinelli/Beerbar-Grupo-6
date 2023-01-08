const fs = require('fs')
const path = require('path')
const db = require('../../database/models');
const bcryptjs = require('bcryptjs')

module.exports = {
    usuarios: (req, res) => {
        db.users.findAll({
            include: [{ all: true }]
        })
            .then(usuarios => {
                // return res.status(200).send(usuarios)
                let dataUsers = usuarios.map(element => {
                    let usuario = {
                        id: element.id,
                        first_name: element.nombre,
                        last_name: element.apellido,
                        email: element.email,
                        contact: element.contacto,
                        rol: element.rol.title,
                        detail: `http://localhost:3005/api/users/${element.id}`,
                    }
                    return usuario
                });

                let users = {
                    status: 200,
                    meta: {
                        users: 'LISTA DE USUARIOS',
                        count: usuarios.length,
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: dataUsers,
                }
                return res.status(200).json(users)
            })
            .catch(error => res.status(500).send(error))
    },
    usuariosPag: async (req, res) => {

        const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

        try {
            let { orderBy, orderDirect, page, size, ...updateQuery } = req.query;

            const order = orderBy ? orderBy : 'id';
            const direction = orderDirect ? orderDirect : 'ASC';
            //    console.log(updateQuery);

            for (const key in updateQuery) {
                if (key === 'nombre' || key === 'apellido' || key === 'roles_id') {

                    if (updateQuery[key] === null || updateQuery[key].trim().length === 0) {
                        delete updateQuery[key];
                    } else {
                        if (key === 'nombre') {
                            updateQuery[key] = { [Op.substring]: req.query.nombre.trim() };
                        };
                    }
                } else {
                    delete updateQuery[key];
                    url.searchParams.delete(key);
                };
            };
            // console.log(updateQuery);

            const getPagination = (page, size) => {
                const limit = size ? +size : 10;
                const offset = page ? (page - 1) * limit : 0;

                return { limit, offset };
            }
            const { limit, offset } = getPagination(page, size);

            const getPageData = (data, page, limit) => {
                const { count, rows: result } = data;
                const pages = Math.ceil(count / limit);
                const currentPage = page ? +page : 1;

                if (currentPage > pages) {
                    throw new SyntaxError();
                } else {
                    let next_page = '';
                    let previous_page = '';

                    if (url.searchParams.has('page')) {
                        if (!url.searchParams.has('size')) {
                            url.searchParams.set('size', 'limit');
                        };

                        if (currentPage == 1) {
                            url.searchParams.set('page', (currentPage + 1));
                            next_page = url.href;
                        } else {
                            url.searchParams.set('page', (currentPage - 1));
                            previous_page = url.href;
                            url.searchParams.set('page', (currentPage + 1));
                            next_page = url.href;
                        };
                    } else {
                        url.searchParams.set('page', (currentPage + 1));
                        url.searchParams.set('size', 'limit');
                        next_page = url.href
                    }

                    const next = (currentPage === pages) ? null : next_page;
                    const previous = (currentPage === 1) ? null : previous_page;

                    return { count, pages, next, previous, result };
                }
            }
            // traer datos de productos y sus relaciones

            let data = await db.users.findAndCountAll({
                where: updateQuery,
                order: [[order, direction]],
                include: [
                    {
                        association: 'rol',
                        attributes: ['title']
                    },
                    {
                        association: 'imagenesAvatar',
                        attributes: ['name']
                    }
                ],
                limit,
                offset
            });

            let { count, pages, previous, next, result } = getPageData(data, page, limit);

            return res.status(200).json({
                count,
                pages,
                previous,
                next,
                result
            });

        } catch (error) {
            res.status(500).json({
                msg: 'ha ocurrido un error'
            });
        };

    },
    usuarioPorId: (req, res) => {
        const id = req.params.id;
        db.users.findByPk(id, {
            include: [{ all: true }]
        })
            .then(usuario => {

                let user = {
                    status: 200,
                    meta: {
                        users: 'USUARIO ESPECIFICO',
                        rol: usuario.rol.title,
                        imgAvatar: "www.rutagenerica.com",
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                        volverAListaDeUsers: `http://localhost:3005/api/users/`
                    },
                    data: {
                        id: usuario.id,
                        first_name: usuario.nombre,
                        last_name: usuario.apellido,
                        email: usuario.email,
                        genre: usuario.genero,
                        contact: usuario.contacto,
                        roles_id: usuario.roles_id,
                        createdAt: usuario.createdAt,
                    }
                }

                return res.status(200).json(user)
            })
    },
    login: (req, res) => {
        db.users.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                all: true
            }]
        })
            .then((result) => {

                let user = {
                    status: 200,
                    meta: {
                        user: result.nombre,
                        rol: result.rol.title,
                        imgAvatar: "www.rutagenerica.com",
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                    },
                    data: result
                }
                return res.status(200).json(user)

            })

    },

    /* productos apis */
    productos: (req, res) => {

        db.products.findAll()
            .then(productos => {
                // return res.status(200).send(productos)

                let list = {
                    status: 200,
                    meta: {
                        product: 'LISTA DE PRODUCTOS',
                        count: productos.length,
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: productos,
                }
                return res.status(200).json(list)
            })
            .catch(error => res.status(500).send(error))

    },
    productosPorId: (req, res) => {
        const id = req.params.id;
        db.products.findOne({
            where: {
                id:id
            },
            include: [{ all: true }]
        })
            .then(productos => {
                let array = []
                array.push(productos)
                let user = {
                    status: 200,
                    meta: {
                        product: 'PRODUCTO ESPECIFICO',

                        imgProduct: "www.rutagenerica.com",
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                        volverAListaDePrductos: `http://localhost:3000/api/productos/`
                    },
                    data: array
                }
                return res.status(200).json(user)
            })
    },
    crearProducto: (req, res) => {
        // return res.send('holiss')

        const { selectType, nombre, marca, detalle, precio, descuento, stock, categoria } = req.body;
        const img = req.file
        let array = []
        console.log(req.body);
        db.products.create({
            type_id: +selectType,
            nombre: nombre,
            marca: marca,
            detalle: detalle,
            precio: +precio,
            descuento: +descuento,
            stock: +stock,
            vendidos: 0,
            categoria_id: +categoria,
        })
            .then(nuevo => {
                if (img) {
                    let imagen = {
                        name: img.filename,
                        products_id: nuevo.id,
                    }
                    db.images.create(imagen)
                        .then(img => {
                            array.push(nuevo)
                            console.log(array);
                            let result = {
                                status: 200,
                                meta: {
                                    msg: 'producto creado',
                                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                                },
                                data: array,
                            }
                            return res.status(200).json(result)
                        })

                } else {
                    db.images.create({
                        name: "default-img.png",
                        products_id: nuevo.id,
                    })
                        .then(img => {
                            array.push(nuevo)
                            let result = {
                                status: 200,
                                meta: {
                                    msg: 'producto creado',
                                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                                },
                                data: array,
                            }
                            return res.status(200).json(result)
                        })
                }
            })
            .catch(error => req.status(500).send(error))
    },
    editarProducto: (req, res) => {
        let id = req.params.id
        const img = req.file
        // return res.send('holiss ' + id)

        let { selectType, nombre, marca, descripcion, precio, descuento, stock, categoria } = req.body

        console.log(req.body);
        let producto = db.products.findOne({
            where: {
                id: id
            },
            include: [{
                all: true
            }]
        })
        let actualizar = db.products.update({
            type_id: +selectType,
            nombre: nombre,
            marca: marca,
            detalle: descripcion,
            precio: +precio,
            descuento: +descuento,
            stock: +stock,
            categoria_id: +categoria,
        }, {
            where: { id: id }
        })

        Promise.all([producto, actualizar])
            .then(([producto, actualizar]) => {

                if (img) {

                    let image = producto.imagenes[0].name

                    // if (fs.existsSync(path.join(__dirname, '../public/productos', image))) {
                    //     fs.unlinkSync(path.join(__dirname, '../public/productos', image))
                    // }
                    // return res.status(200).json(image)

                    db.images.update({
                        name: img.filename,
                    }, {
                        where: { products_id: id }
                    })
                        .then(img => {

                            let result = {
                                status: 200,
                                meta: {
                                    msg: 'producto editado',
                                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                                },
                                data: 'producto editado correctamente',
                            }
                            return res.status(200).json(result)
                        })
                }
                else {
                    let image = producto.imagenes[0].name

                    db.images.update({
                        name: image,
                    }, {
                        where: { products_id: id }
                    })
                        .then(img => {
                            let result = {
                                status: 200,
                                meta: {
                                    msg: 'producto editado',
                                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                                },
                                data: 'producto editado correctamente',
                            }
                            return res.status(200).json(result)
                        })
                }

            })
            .catch(errors => res.status(500).send(errors))

    },
    eliminarProducto: (req, res) => {
        const id = +req.params.id;

        let buscar = db.products.findOne({
            where: {
                id: id
            },
            include: [{
                all: true
            }]
        })
        let destroy = db.products.destroy({
            where: {
                id: id
            }
        })
        Promise.all([buscar, destroy])
        .then(([buscar, destroy]) => {
            db.images.destroy({
                where:{
                    products_id: id
                }
            })
            .then(resultado => {
                let result = {
                    status: 200,
                    meta: {
                        msg: 'producto eliminado',
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: 'producto Eliminado',
                }
                return res.status(200).json(result)
            })
        })
    }
}


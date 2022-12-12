let db = require('../../database/models')
const { Op } = require("sequelize");


const productVerify = (carrito, id) => {

    let index = -1;

    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].id === +id) {
            index = i;
            break
        }
    }

    return index
}

module.exports = {
    contador: async (req, res) => {
       try {
        let cantidad = 1
        let producto = await db.products.findOne({
            where: {id : +req.params.id}
        })
        
        if (cantidad < producto.stock && req.params.nro) {
            cantidad = +req.params.nro
        }

        let response = {
            status: 200,
            meta: {
                count: cantidad,
                path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: cantidad
        }
        return res.status(200).json(response)

       } catch (error) {
        res.status(500).send(error)
       }
    },

    listaCarrito: async (req, res) => {
        try {

            let response = {
                status: 200,
                meta: {
                    length: req.session.carrito.length,
                    path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: req.session.carrito
            }
            return res.status(200).json(response)

        } catch (err) {
            res.status(500).send(err)
        }
    },
    addItem: async (req, res) => {
         // recibimos un id producto
        // 1. buscar el producto, traer datos
        // 2. verificar si el usuario tiene o no una orden pendiente
        // ------------- si tiene una orden
        //    - verificar si el producto que esta agregando existe
        //      - si existe, unicamente modificamos la cantidad
        //      - si no existe, agregamos el producto al carrito(crear el registro)
        //      - modificar la session, con la info actualizada
        // ------------- si no tiene una orden pendiente
        //     - creamos un registro/orden de compra asociado al usuario
        //     - creamos un carrito asociado al usurio
        //     - agregamos el producto al carrito
        //     - agregarlo a la session

        let producto = await db.products.findOne({
            where: {
                id: +req.params.id
            },
            include: [
                {
                    association: 'imagenes',
                    attributes: ['name']
                }
            ]
        })
        
        // crear objeto item que se agregara y se pasara a la session 
        let item = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio, 
            descuento: producto.descuento,
            stock: producto.stock,
            imagen:producto.imagenes[0].name,
            cantidad: 1,
            subtotal: +producto.precio - (+producto.precio * +producto.descuento / 100),
        }

        // verificar  si esta vacio el carrito
        if (req.session.carrito.length === 0) {
            
            let orden = await db.ordenes.findOne({
                where: {
                    users_id: req.session.userLogin.id,
                    status: 'pendiente'
                },
                include: [
                    {
                        association: 'carrito',
                        attributes: ['products_id', 'cantidad'],
                    }
                ]
            })

            if (!orden) {
                let nuevaOrden = await db.ordenes.create({
                    users_id: req.session.userLogin.id,
                    status: 'pendiente'
                })

                // agregar dato que falta al item
                item = {
                    ...item,
                    orden_id: nuevaOrden.id
                }

                // sctualizar datos de la session
                req.session.carrito.push(item)

                // crear nuevo registro de carrito asociado a la orden de compra
                await db.carts.create({
                    users_id: req.session.userLogin.id,
                    products_id: item.id,
                    ordenes_id: nuevaOrden.id,
                    cantidad: 1,
                })
            } else {
                // en caso de que tenga una orden pendiente y el carrito vacio
                item = {
                    ...item,
                    orden_id: orden.id
                }
                req.session.carrito.push(item)

                await db.carts.create({
                    users_id: req.session.userLogin.id,
                    products_id: item.id,
                    ordenes_id: orden.id,
                    cantidad: 1,
                })

            }
        } else {
            console.log("Ingreso correctamente")
            // en caso de tener productos en su carrito

            let index = productVerify(req.session.carrito, req.params.id);

            let orden = await db.ordenes.findOne({
                where: {
                    users_id: req.session.userLogin.id,
                    status: 'pendiente'
                }
            })
            
            if (index === -1) {
                
                item = {
                    ...item,
                    orden_id: orden.id
                }
                req.session.carrito.push(item)

                await db.carts.create({
                    users_id: req.session.userLogin.id,
                    products_id: item.id,
                    ordenes_id: orden.id,
                    cantidad: 1,
                })
                console.log("Aca muestro el carrito")
                console.log(req.session.carrito)

            } else {
                // si el producto existe en el carrito
                let producto = req.session.carrito[index]
                producto.cantidad++
                producto.subtotal = (+producto.precio - (+producto.precio * +producto.descuento / 100)) * producto.cantidad

                req.session.carrito[index] = producto
                console.log(req.session.carrito)

                await db.carts.update(
                    {
                        cantidad: producto.cantidad
                    },
                    {
                        where: {
                            ordenes_id: producto.orden_id,
                            products_id: producto.id
                        }
                    }
                )
            }
        }

        console.log("Aca mostramos la session que se pasa nuevamente")
        console.log(req.session.carrito)
        let response = {
            status: 200,
            meta: {
                length: req.session.carrito.length,
                path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: req.session.carrito
        }
        console.log(response)
        return res.status(200).json(response)
    },
    removeItem: async (req, res) => {
        try {
             // buscamos la posición del producto dentro del carrito(session)
            let index = productVerify(req.session.carrito, +req.params.id );

            let producto = req.session.carrito[index];
            // eliminar el item de la sessión
            req.session.carrito.splice(index, 1)

            // eliminar el item de la base de datos
            await db.carts.destroy({
                where: {
                    products_id: producto.id,
                    ordenes_id: producto.orden_id
                }
            })

            let response = {
                status: 200,
                meta: {
                    length: req.session.carrito.length,
                    path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: req.session.carrito
            }
            return res.status(200).json(response)

        } catch (error) {
            res.status(500).send(error)
        }
    },
    modifyItem: async (req, res) => {

        let index = productVerify(req.session.carrito, +req.params.id );

        let producto = req.session.carrito[index];
        console.log(producto);

        if (producto.cantidad > 1) {
            // actualizar la cantidad
            producto.cantidad--;
            producto.subtotal = (+producto.precio - (+producto.precio * +producto.descuento / 100)) * producto.cantidad;

            req.session.carrito[index] = producto;

             await db.carts.update({
                cantidad: producto.cantidad
            }, {
                where : {
                    products_id: producto.id,
                    ordenes_id: producto.orden_id
                }
            })
            
        } else {
            // si es < 1 eliminar el producto
            req.session.carrito.splice(index, 1)

            await db.carts.destroy({
                where: {
                    products_id: producto.id,
                    ordenes_id: producto.orden_id
                }
            })

        }

         let response = {
            status: 200,
            meta: {
                length: req.session.carrito.length,
                path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: req.session.carrito
        }
        return res.status(200).json(response)

    },
    empty: (req, res) => {

    }
}
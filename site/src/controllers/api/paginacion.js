let db = require('../../database/models');
const { Op } = require("sequelize");

module.exports = {
    paginacion: async (req, res) => {
        const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

        // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)

        try {

            // res.send('funca wey2')
            let {orderBy, orderDirect, page, size, ...updateQuery} = req.query;

            const order = orderBy ? orderBy : 'id';
            const direction = orderDirect ? orderDirect : 'ASC';
        //    console.log(updateQuery);

            for (const key in updateQuery) {
                if (key === 'nombre' || key === 'categoria_id' || key === 'type_id') {
                    
                    if (updateQuery[key] === null || updateQuery[key].trim().length === 0) {
                        delete updateQuery[key];
                    } else {
                        if (key === 'nombre') {
                            updateQuery[key] = {[Op.substring] : req.query.nombre.trim()};
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

                return {limit, offset};          
            }
            const {limit, offset} = getPagination(page, size);

            const getPageData = (data, page, limit) => {
                const {count, rows: result} = data;
                const pages = Math.ceil(count / limit);
                const currentPage = page ? +page : 1;

                if (currentPage > pages) {
                    throw new SyntaxError(); 
                } else {
                    let next_page = '';
                    let previous_page = '';

                    if (url.searchParams.has('page')) {
                        if(!url.searchParams.has('size')){
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

                    return {count, pages, next, previous, result};
                }
            }
            // traer datos de productos y sus relaciones

            let data = await db.products.findAndCountAll({
                where: updateQuery,
                order: [[order, direction]],
                include : [
                    {
                        association : 'tipos',
                        attributes : ['name']
                    },
                    {
                        association: 'category',
                        attributes: ['name']
                    }
                ],
                limit,
                offset
            });

            let {count, pages, previous, next, result} = getPageData(data, page, limit);

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

    }
}
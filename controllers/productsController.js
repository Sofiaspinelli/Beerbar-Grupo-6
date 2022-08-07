module.exports = {
    products : (req,res) => {
        res.render ('productos')
    },
    cart : (req,res) => {
        res.render ('carrito')
    }
}
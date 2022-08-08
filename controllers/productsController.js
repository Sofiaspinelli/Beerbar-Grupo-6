module.exports = {
    products : (req, res) => {
        res.render ('products')
    },
    detail: (req, res) => {
        res.render('detail')
    },
    cart : (req, res) => {
        res.render ('cart')
    }
}
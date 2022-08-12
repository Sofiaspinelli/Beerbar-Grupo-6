const res = require("express/lib/response");

module.exports = {
  crear:(req,res) => {
      return res.render('admin/crear')
  },
  editar:(req,res) => {
      
    return res.render('admin/editar')
  }
}
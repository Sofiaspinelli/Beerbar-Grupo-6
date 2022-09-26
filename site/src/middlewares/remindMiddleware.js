function remindMiddleware(req, res, next) {
    next();
  if (req.cookies.recordame != undefined && req.session.userLogin == undefined){
         let usersJSON = fs.readFileSync('users.json', {
          encoding: 'utf-8'});
          let users;
          if (usersJSON == "") {
               users = [];
          }else{
             users = JSON.parse(usersJSON);
          }
          let userLogin
          for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.recordame){
                userLogin = users[i];
                break;
            }
          }
          req.session.userLogin = usuario;
  }

}

module.exports = remindMiddleware
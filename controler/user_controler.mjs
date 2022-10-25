import * as BookList from './models/book_List_model.mjs'

const doLogin = async (req,res,next)=>{
    const user= await BookList.login(req.body.username , req.body.password)
    if (user){
      req.session.username = req.body.username
      res.locals.username=req.session.username
      next()
    } else{
      throw new errors("Σφάλμα")
    }
  }

  const doRegister =  async (req,res,next)=>{
    const username=req.body.username
    const password=req.body.password
    const user = await BookList.addUser(username,password)
    res.render("home")}

function checkIfAuthenticated(req, res, next) {
    if (req.session.username) {
      res.locals.username=req.session.username
      next()
    }
    else { 
      res.redirect('/') 
    }
  }

  export {checkIfAuthenticated , doLogin , doRegister}
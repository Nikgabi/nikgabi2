import express from 'express'
import * as BookList  from './models/booklist_model.mjs'
import * as Validator from './validator/validation.mjs'
import * as UserController from './controler/user_controler.mjs'
import * as BookControler from './controler/book_controler'

const router = express.Router()

router.get('/',
  (req, res) => {
    res.render("home")
  })

router.get('/register',(req,res)=>{
  res.render('registrationform')
})

router.post('/doregister',(req,res)=>{
  Validator.validateNewUser ,
  UserController.doRegister} )

router.get('/books',(req,res)=>{
  UserController.checkIfAuthenticated,
  BookControler.showBookList})

router.post('/books',
    UserController.checkIfAuthenticated,
    Validator.validateLogin ,
    UserController.doLogin,    
    BookControler.showBookList)

router.get('/addbookform',
  UserController.checkIfAuthenticated,
  (req, res) => {
    res.render("addbookform")
  })

router.post(
  '/doaddbook',
  UserController.checkIfAuthenticated,
  Validator.validateNewBook,
  BookControler.addBook
 )

 router.delete('/deleteBook',
 UserController.checkIfAuthenticated,
 Validator.validateLogin ,
 UserController.doLogin, 
 BookControler.deleteBook , res.redirect('/books'))

router.get('/logout',
  UserController.checkIfAuthenticated,
  (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })



export { router }
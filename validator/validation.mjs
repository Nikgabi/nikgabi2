import { body, validationResult } from 'express-validator'
import validator from 'validator'

const validateLogin=[
    body("username")
    .trim().escape().isLength({min:4})
    .withMessage("Το username πρέπει να έχει τουλάχιστον 4 χαρακτήρες"),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(errors.isEmpty()) {
            next()}
        else{
            res.render('home',{message:errors.mapped()})
            }
        }
]

const validateNewBook=[
    body("newBookTitle")
    .trim()
    .escape()
    .isAlpha('el-GR', { ignore: " -,.;" })
    .withMessage("Ο τίτλος πρέπει να είναι γραμμένος στα ελληνικά")
    .isLength({ min: 5 })
    .withMessage("Ο τίτλος πρέπει να περιέχει τουλάχιστον 5 γράμματα")
  ,
  body("newBookAuthor")
    .trim()
    .escape()
    .isAlpha('el-GR', { ignore: " -,." })
    .withMessage("Οι συγγραφείς πρέπει να είναι γραμμένοι στα ελληνικά")
    .isLength({ min: 5 })
    .withMessage("Οι συγγραφείς πρέπει να περιλαμβάνουν τουλάχιστον 5 χαρακτήρες")
  ,
  (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        next()
    }else{
        res.render('addbookform',{message:errors.mapped(),
            title: req.body["newBookTitle"],
            author: req.body["newBookAuthor"]})
        }}
      
]


const validateNewUser =[
    body("username")
    .trim().escape().isLength({min:4}).withMessage("Το username πρέπει να έχει τουλάχιστον 4 χαρακτήρες"),
    body("password2")
    .trim().isLength({min:4 , max:10}).withMessage("Από 4 έως 10 χαρακτήρες")
    .custom((value,{req})=>{
      if (value!=req.body.password)
          throw new Error ("Το password πρέπει να είναι ίδιο ")
      else 
        return true    
    }),
    (req,res,next)=>{
      const errors=validationResult(req)
      if(errors.isEmpty()){
        next()
      }else{
        res.render("registrationform",{
            message:errors.mapped()
          })
      }}
]

export { validateLogin , validateNewBook ,validateNewUser}
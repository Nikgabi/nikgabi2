import * as BookList from './models/book_List_model.mjs'

const showBookList = async function showBookList(req, res, next) {
    try {
      const myBooks = await BookList.loadBooks(req.session.username)
      res.render("booklist", { books:myBooks })
    } catch (error) {
      next(error)
    }
  }

const addBook = async (req, res) => {
    const newBook = {
    "title": req.body["newBookTitle"],
    "author": req.body["newBookAuthor"]}
    const bookList = new BookList(req.session.username)
    await bookList.addBook(newBook)
    res.redirect('/books')
  }  

 const deleteBook = async (req,res)=>{
    const bookToRemove = await Book.findOne({
        where: {title: book.title}})
    await bookToRemove.removeUser(this.user)
    const numberOfUsers = await bookToRemove.countUsers()
    // if no other user has the book then remove it
    if (numberOfUsers == 0) {
        Book.destroy({
            where: { title: book.title}})}
 }          

export {showBookList , addBook , deleteBook }
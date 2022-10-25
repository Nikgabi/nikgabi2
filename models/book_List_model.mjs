import {Book,User } from './booklist_seq_post.mjs'
import bcrypt from 'bcrypt'

async function addUser(username,password){
    try{
        if(!username || !password)
        throw new Error("Λείπει το όνομα ή το συνθηματικό του χρήστη")
    let user=await User.findOne({where:{name:username}})
    if(user)
        throw new Error("Υπάρχει ήδη χρήστης με το όνομα  "+username)
    const hash = await bcrypt.hash(password,10)
    user = await User.create({name:username , password:hash })
    return user 
    }catch(error){
        throw error
    }
}

async function login(username,password){
    try{
        if(!username || !password)
            throw new Error("Λείπει το όνομα ή το συνθηματικό του χρήστη")
        let user=await User.findOne({where:{name:username}})
        if(!user)
            throw new Error("Δεν υπάρχει  χρήστης με το όνομα  "+username)
        const match = await bcrypt.compare(password,user.password)
        if(match)
            return user
        else
            throw new Error("Λάθος στοιχεία password")
        
        }catch(error){
            throw error
        }
}



async function loadBooks(username) {
    try {
        if (!username)
            throw new Error("Πρέπει να δοθεί όνομα χρήστη")
        const user=await User.findOne({where:{name:username}})
        if(!user)
            throw new Error("Άγνωστος χρήστης")
        // console.log("------> ", this.user, "<<<<<<<<<<")
        const myBooks = await user.getBooks({ raw: true })
        return myBooks
    } catch (error) {
        // let the caller handle the error
        throw error
    }
}

async function addBook(newBook ,username) {
    try {
        if (!username)
            throw new Error("Πρέπει να δοθεί όνομα χρήστη")
        const user=await User.findOne({where:{name:username}})
        if(!user)
            throw new Error("Άγνωστος χρήστης")
        const [book,created]=await Book.findOrCreate({
            where:{
                title:newBook.title,
                author:newBook.author
            }
        })
        await user.addBook(book)
    } catch (error) {
        throw new Error(error)
    }
}

async function deleteBook(book) {
    try {
        // At first find or add the user
        await this.findOrAddUser()
        // try to find the book to remove
        const bookToRemove = await Book.findOne({
            where: {
                title: book.title
            }
        })

        // Remove the user from the book
        await bookToRemove.removeUser(this.user)
        // await this.user.removeBook(bookToRemove) // another way

        // check if other users have the book
        const numberOfUsers = await bookToRemove.countUsers()
        // if no other user has the book then remove it
        if (numberOfUsers == 0) {
            Book.destroy({
                where: {
                    title: book.title
                }
            })
        }

    } catch (error) {
        throw error
    }
}

async function findOrAddUser() {
    // if there is no user
    if (this.user == undefined) {
        try {
            // find or create the user from username
            const [user, user_created] = await User.findOrCreate({
                where: {
                    name: this.username
                }
            })
            // set user
            this.user = user
        } catch (error) {
            throw error
        }
    }
}

export {addUser , login ,addBook , deleteBook , findOrAddUser , loadBooks}
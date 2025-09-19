import Books from "../models/book.model.js"
import cloudinary from "../lib/cloudinary.js";

export const allBooks = async(req,res)=>{
    try {
        const books = await Books.find();
        if(books.length === 0){
             return res.status(404).json({message:"no book found"})
        }
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in all books controller",error)
    }
}

export const addBooks = async(req,res)=>{
    try {
        const {title,author,genre,coverUrl} = req.body
        if(!title){
            return res.status(400).json({message:"Title is require"})
        }
        if(!author){
            return res.status(400).json({message:"Author is require"})
        }
        if(!genre){
            return res.status(400).json({message:"Genre is require"})
        }
        if(!coverUrl){
            return res.status(400).json({message:"coverUrl is require"})
        }
        let imageUrl;
        if(coverUrl){
            const uploadResponse = await cloudinary.uploader.upload(coverUrl);
            imageUrl = uploadResponse.secure_url;
        }
        const book = new Books({
            title,
            author,
            genre,
            coverUrl:imageUrl,
        })
        await book.save();
        res.status(200).json({message:"Book is added"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in add books controller",error)
    }
}

export const editBooks = async(req,res)=>{
    try {
        const {title,author,genre,coverUrl} = req.body
        const bookId = req.params.id
        let updateBooks = {
            title,
            author,
            genre,
        }
        if(coverUrl){
            const uploadResponse = await cloudinary.uploader.upload(coverUrl);
            updateBooks.coverUrl = uploadResponse.secure_url;
        }
        const updatedBooks = await Books.findByIdAndUpdate(
            bookId,
            updateBooks,
            {new:true,runValidators:true}
        )
        if(!updatedBooks){
            return res.status.json({message:"Book not found"})
        }
        res.status(200).json({message:"Book is updated"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in edit book controller",error)
    }
}

export const deleteBook = async(req,res) =>{
    try {
        const bookId = req.params.id
        if(!bookId){
            return res.status(400).json({message:"book Id is required"})
        }
        const del = await Books.findByIdAndDelete(bookId)
        if(!del){
            return res.status(400).json({message:"Book not found"})
        }
        res.status(200).json({message:"book deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in delete book controller",error)
    }
}

export const oneBook = async(req,res) =>{
    try {
        const bookId = req.params.id
        if(!bookId){
            return res.status(400).json({message:"book Id is required"})
        }
        const book = await Books.findById(bookId)
        if(!book){
            return res.status(400).json({message:"Book not found"})
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in all books controller",error)
    }
}
import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    author:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    coverUrl:{
        type:String,
        required:true
    }
})

const Books = mongoose.model("Books",bookSchema);
export default Books
import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vignesh:vicky9899@cluster0.fsuhb.mongodb.net/food-del').then(()=>console.log("DB Connected"));
    
}
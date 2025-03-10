import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const SalesmanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },

    phonenumber: {
        type: String, 
        required: true,
        trim: true
    },

    age: {
        type: Number,
        required: true,
        min: 18, 
        max: 100 
    },

    place: {
        type: String,
        required: true,
        trim: true
    },

    password:{
        type:String,
        required:true,
        minlength:4
    }
});

SalesmanSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

export default mongoose.model("Salesman", SalesmanSchema);

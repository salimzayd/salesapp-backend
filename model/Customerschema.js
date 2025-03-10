import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
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

    place: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model("Customer", CustomerSchema);

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0 
    },

    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100 
    }
});

export default mongoose.model("Product", ProductSchema);

import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    salesman: { type: mongoose.Schema.Types.ObjectId, ref: "Salesman", required: true }, // Reference to Salesman
  }, { timestamps: true });
  
  const Sales = mongoose.model("Sales", saleSchema);
  
  export default Sales;
  
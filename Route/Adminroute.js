import express from "express";
import { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer } from "../Controller/Admincontroller.js";
import { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct } from "../Controller/Admincontroller.js";
import { addSalesman,getSalesmen,getSalesmanById,updateSalesman,deleteSalesman,getSalesBySalesmanId } from "../Controller/Admincontroller.js";
import { adminlogin } from "../Controller/Authcontroller.js";
import AdminToken from "../middleware/AdminAuth.js";

const adminroute = express.Router();

adminroute.post("/login",adminlogin)

adminroute
.use(AdminToken)


.post("/customers",createCustomer)
.get("/customers",getAllCustomers)
.get("/customers/:id" ,getCustomerById)
.put("/customers/:id", updateCustomer)
.delete("/customers/:id", deleteCustomer)

.post("/products", createProduct)
.get("/products", getAllProducts)
.get("/products/:id", getProductById)
.put("/products/:id", updateProduct)
.delete("/products/:id", deleteProduct)


.post("/salesmen", addSalesman)
.get("/salesmen", getSalesmen)
.get("/salesmen/:id", getSalesmanById)
.put("/salesmen/:id", updateSalesman)
.delete("/salesmen/:id", deleteSalesman)
.get("/salesmen/:id/sales",getSalesBySalesmanId)

export default adminroute;

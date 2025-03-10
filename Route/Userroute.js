import express from 'express'
import { salesmenlogin } from '../Controller/Authcontroller.js'
import {createSale,getSalesBySalesman,searchCustomers,searchProducts} from '../Controller/UserController.js'
const userroute  = express.Router()
import UserToken from '../middleware/UserAuth.js'




userroute.post("/login",salesmenlogin)

userroute.use(UserToken)

userroute.post("/salesform",UserToken,createSale)
userroute.get("/salesform/:id",UserToken,getSalesBySalesman)
// userroute.get("/salesform",Salesbymen)

userroute.get("/search/customers", searchCustomers)
userroute.get("/search/products", searchProducts)



export default userroute;
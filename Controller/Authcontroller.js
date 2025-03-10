import Salesman from "../model/Salesmanschema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()


const Admin_credentials = {
    email : "admin@gmail.com",
    password: "admin123"
};

// admin login

export const adminlogin = (req, res) => {
    console.log("Admin login route hit!"); 

    const { email, password } = req.body;
    console.log("Admin Access Token Secret:", process.env.Admin_Access_Token_Secret);

    if (email === Admin_credentials.email && password === Admin_credentials.password) {
        const token = jwt.sign({ role: "admin" }, process.env.Admin_Access_Token_Secret, { expiresIn: "1h" });
        res.json({ message: "Admin login successful", token, role: "admin" });
    } else {
        res.status(401).json({ message: "Invalid admin credentials" });
    }
};



// salesman login
export const salesmenlogin = async (req, res) => {
    console.log("Salesmen login route hit!");

    const { email, password } = req.body;
    console.log("Request Body:", req.body);

    const salesman = await Salesman.findOne({ email });

    if (!salesman) {
        console.log("Salesman not found");
        return res.status(404).json({ message: "Salesman not found" });
    }

    console.log("Salesman found:", salesman);

    if (!password || !salesman.password) {
        console.log("Error: Missing password or hash");
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, salesman.password).catch(err => {
        console.error("Bcrypt compare error:", err);
        return res.status(500).json({ message: "Server error" });
    });

    if (!isMatch) {
        console.log("Invalid password");
        return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ **Include `salesman._id` in JWT Token**
    const token = jwt.sign(
        { salesmanId: salesman._id, name: salesman.name, role: "salesman" },  
        process.env.User_Access_Token_Secret,
        { expiresIn: "1h" }
    );

    console.log("Salesman login successful, Token:", token);

    // ✅ **Send `salesmanId` in the response**
    res.json({ 
        message: "Salesman login successful", 
        token, 
        role: "salesman", 
        salesmanId: salesman._id // Include salesmanId in response
    });
};

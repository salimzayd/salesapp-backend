import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Salesman from "../model/Salesmanschema.js"; // Make sure path is correct

dotenv.config();

const UserToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).send({ error: "No token provided" });
  }
  
  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.User_Access_Token_Secret);
    console.log("Decoded Token:", decoded); // Debugging purpose
    
    // Set the name from the token
    req.name = decoded.name;
    
    // Important: Find the salesman by name and get their ID
    const salesman = await Salesman.findOne({ name: decoded.name });
    
    if (!salesman) {
      return res.status(404).json({ message: "Salesman not found with the provided name" });
    }
    
    // Set the salesman ID to the request object
    req.salesmanId = salesman._id;
    
    console.log("Authenticated Salesman:", {
      name: req.name,
      id: req.salesmanId
    });
    
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default UserToken;
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminroute from "./Route/Adminroute.js";
import userroute from "./Route/Userroute.js";


const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://salesapp-frontend.vercel.app/", // Allow frontend origin
  methods: "GET,POST,PUT,DELETE",
  credentials: true // Allow cookies if needed
}));


// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes


app.use("/api/admin",adminroute);
app.use("/api/sales",userroute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import Sales from "../model/SalesSchema.js"
import Product from "../model/Productschema.js";
import Customer from "../model/Customerschema.js";
import Salesman from "../model/Salesmanschema.js"


// Create Sales Form
// export const createSalesForm = async (req, res) => {
//     try {
//         const { salesman, customer, product, quantity } = req.body;

//         // Fetch product details to calculate totalAmount
//         const productDetails = await Product.findById(product);
//         if (!productDetails) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Calculate discounted price
//         const discount = (productDetails.price * productDetails.discountPercentage) / 100;
//         const discountedPrice = productDetails.price - discount;

//         // Calculate total amount after discount
//         const totalAmount = quantity * discountedPrice;

//         const newSale = new SalesForm({
//             salesman,
//             customer,
//             product,
//             quantity,
//             totalAmount
//         });

//         await newSale.save();
//         res.status(201).json({ message: "Sale recorded successfully", sale: newSale });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// export const createSales = async (req, res) => {
//     try {
//         console.log("Request User:", req.user); // Debugging log
//         if (!req.user) {
//             return res.status(401).json({ error: "User not authenticated" });
//         }

//         const { customer, email, place, product, price, discountPercentage, quantity, totalAmount } = req.body;

//         // Assuming sales is linked to the authenticated user
//         const newSale = new Sale({
//             user: req.user.id, // Ensure req.user exists
//             customer,
//             email,
//             place,
//             product,
//             price,
//             discountPercentage,
//             quantity,
//             totalAmount
//         });

//         await newSale.save();
//         res.status(201).json({ message: "Sale recorded successfully", sale: newSale });

//     } catch (error) {
//         console.error("Error creating sale:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };


export const createSale = async (req, res) => {
  try {
    const { customer, product, quantity, salesman } = req.body;
    console.log('Received Data:', req.body);

    // Fetch product details from DB
    const productDetails = await Product.findById(product);
    if (!productDetails) {
      return res.status(404).json({ error: "Product not found" });
    }

    let salesmanId = salesman; // Create a new variable

    if (typeof salesman === "string") {
      const salesmanData = await Salesman.findOne({ name: salesman });
      if (!salesmanData) {
        return res.status(400).json({ error: "Salesman not found" });
      }
      salesmanId = salesmanData._id; // Assign the ObjectId to the new variable
    }

    // Calculate discounted price
    const discount = (productDetails.price * productDetails.discountPercentage) / 100;
    const discountedPrice = productDetails.price - discount;

    // Calculate total amount
    const totalAmount = discountedPrice * quantity;

    // Save sale to DB
    const newSale = new Sales({
      customer,
      product,
      quantity,
      totalAmount,
      salesman: salesmanId, // Use the new variable
    });

    await newSale.save();
    res.status(201).json({ message: "Sale recorded successfully", sale: newSale });
  } catch (error) {
    console.error("Error processing sale:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const getSalesBySalesman = async (req, res) => {
  try {
    const { id } = req.params;

    const sales = await Sales.find({ salesman: id }).populate("salesman", "name")
    .populate("customer", "name email place phonenumber")
      .populate("product", "name price discountPercentage quantity");

    if (!sales.length) {
      return res.status(404).json({ message: "No sales found for this salesman" });
    }

    // Calculate total sales amount
    const totalAmount = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

    res.status(200).json({ sales, totalAmount });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ error: "Server error" });
  }
};


  
  

  
  


export const searchCustomers = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: "Name query is required" });
        }

        const customers = await Customer.find({ 
            name: { $regex: `^${name.trim()}`, $options: "i" } // Searches from start of the name
        }).select("name email place");
        
        console.log("Searching for customers with name:", name);

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Search Products by Name

export const searchProducts = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: "Name query is required" });
        }

        const products = await Product.find({ 
            name: { $regex: `^${name.trim()}`, $options: "i" } // Searches from start of the name
        }).select("name price discountPercentage");
        

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

import Customer from "../model/Customerschema.js"
import Product from "../model/Productschema.js"
import Salesman from "../model/Salesmanschema.js"
import Sales from "../model/SalesSchema.js";


export const getSalesBySalesmanId = async (req, res) => {
    try {
        const { id } = req.params;

        const sales = await Sales.find({ salesman: id })
            .populate("customer")
            .populate("product");

        console.log("Fetched Sales Data:", sales); // Debugging

        if (!sales || sales.length === 0) {
            return res.status(200).json([]); // Return an empty array instead of 404
        }

        return res.status(200).json(sales);

    } catch (error) {
        console.error("Error fetching sales:", error); // Debugging
        return res.status(500).json({ message: "Error fetching sales details", error: error.message });
    }
};



// new customer
export const createCustomer = async (req, res) => {
    try {
        const { name, email, phonenumber, place } = req.body;

        
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newCustomer = new Customer({ name, email, phonenumber, place });
        await newCustomer.save();

        res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error creating customer", error: error.message });
    }
};

// Get customers
export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error: error.message });
    }
};

// Get a single customer by ID
export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customer", error: error.message });
    }
};

// Update a customer by ID
export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phonenumber, place } = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { name, email, phonenumber, place },
            { new: true, runValidators: true } 
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error updating customer", error: error.message });
    }
};

// Delete a customer by ID
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error: error.message });
    }
};


// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, price, discountPercentage } = req.body;

        const newProduct = new Product({ name, price, discountPercentage });
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, discountPercentage } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, discountPercentage },
            { new: true, runValidators: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};



// Add a new salesman
export const addSalesman = async (req, res) => {
    try {
        const { name, email, phonenumber, age, place ,password} = req.body;
        console.log(req.body)
        const newSalesman = new Salesman({ name, email, phonenumber, age, place, password });
        await newSalesman.save();
        res.status(201).json({ message: "Salesman added successfully", salesman: newSalesman });
    } catch (error) {
        res.status(500).json({ message: "Error adding salesman", error: error.message });
    }
};

// Get all salesmen
export const getSalesmen = async (req, res) => {
    try {
        const salesmen = await Salesman.find();
        res.status(200).json(salesmen);
    } catch (error) {
        res.status(500).json({ message: "Error fetching salesmen", error: error.message });
    }
};

// Get a single salesman by ID
export const getSalesmanById = async (req, res) => {
    try {
        const { id } = req.params;
        const salesman = await Salesman.findById(id);
        if (!salesman) {
            return res.status(404).json({ message: "Salesman not found" });
        }
        res.status(200).json(salesman);
    } catch (error) {
        res.status(500).json({ message: "Error fetching salesman", error: error.message });
    }
};

// Update a salesman
export const updateSalesman = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSalesman = await Salesman.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedSalesman) {
            return res.status(404).json({ message: "Salesman not found" });
        }
        res.status(200).json({ message: "Salesman updated successfully", salesman: updatedSalesman });
    } catch (error) {
        res.status(500).json({ message: "Error updating salesman", error: error.message });
    }
};

// Delete a salesman
export const deleteSalesman = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSalesman = await Salesman.findByIdAndDelete(id);
        if (!deletedSalesman) {
            return res.status(404).json({ message: "Salesman not found" });
        }
        res.status(200).json({ message: "Salesman deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting salesman", error: error.message });
    }
};

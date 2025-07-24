const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Product = require("./models/ProductSchema");
const User = require("./models/UserSchema");
const products = require("./data/products");
const Cart = require("./models/cartItemsSchema");

mongoose.connect(process.env.MONGO_URL);

const seedData = async () => {
    try {
 
        await Product.deleteMany(); 
        await User.deleteMany();
        await Cart.deleteMany();

        const createUser = await User.create({
            name: "Admin User",
            email: "admin@gmail.com",
            password: "Admin@123",
            role: "admin",
        });

        const userId = createUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userId }
        });

        await Product.insertMany(sampleProducts);

        console.log("Products saved successfully");
        process.exit();
    } catch (error) {
        console.log("error seeding data: ", error);
        process.exit(1);
    }
}

seedData();

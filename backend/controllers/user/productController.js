const Products = require("../../models/ProductSchema");

//Products

const loadProducts = async (req, res) => {
    try {

        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            limit
        } = req.query;

        let query = {};

        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        }

        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }

        if (material) {
            query.material = { $in: material.split(",") };
        }

        if (size) {
            query.sizes = { $in: size.split(",") };
        }

        if (color) {
            query.colors = { $in: color.split(",") };
        }

        if (gender) {
            query.gender = gender;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ]
        }

        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        let products = await Products.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}

//Product Details

const loadProductsDetails = async (req, res) => {
    try {

        const product = await Products.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        console.log("error occured viewing product details: ", error);
        res.status(500).send("server error");
    }
}

//Similar Products

const loadSimilarProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Products.findById(id);

        if (!products) {
            return res.status(404).json({ message: "Products not found" });
        }

        const relatedProducts = await Products.find({
            _id: { $ne: id },
            gender: product.gender,
            category: product.category,
        }).limit(4);

        res.json(relatedProducts);
    } catch (error) {
        console.log("error loading similarProducts: ", error);
        res.status(500).send("server error");
    }
}

//Best Seller

const loadBestSeller = async (req, res) => {
    try {
        
        const topSeller = await Products.findOne().sort({ rating: -1 });

        if (topSeller) {
            res.json(topSeller)
        } else {
            res.status(404).json({ message: "No Best seller found" });
        }
    } catch (error) {
        console.log("Error Loading best seller: ", error);
        res.status(500).send("server error");
    }
}

//New Arrivals

const loadNewArrivals = async (req, res) => {
    try {

        const newArrivals = await Products.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals);
    } catch (error) {
        console.log("Error loading new Arrivals: ", error);
        res.status(500).send("server error");
    }
}

module.exports = {
    loadProducts,
    loadProductsDetails,
    loadSimilarProducts,
    loadBestSeller,
    loadNewArrivals,
}; 
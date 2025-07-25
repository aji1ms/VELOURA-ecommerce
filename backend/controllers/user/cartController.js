const Cart = require("../../models/cartItemsSchema");
const Product = require("../../models/ProductSchema");


const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

//Load Cart Page

const loadCartPage = async (req, res) => {
    const { guestId, userId } = req.query;
    try {
        const cart = await getCart(userId, guestId);

        if (Cart) {
            res.json(cart)
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.log("Error loading cart page: ", error);
        res.status(500).send("Server error");
    }
}

//Add to cart

const addToCart = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product Not Found" });

        let cart = await getCart(userId, guestId);

        if (cart) {

            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId.toString() &&
                    p.size == size &&
                    p.color == color
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {

            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                }],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.log("error occured add to cart", error);
        res.status(500).send("server error");
    }
}

//Update Cart

const updateCart = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {

        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart Not Found" });

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size == size &&
                p.color == color
        );

        if (productIndex > -1) {

            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity, 0);

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.log("Error while updating product: ", error);
        res.status(500).send("server error");
    }
}

//Delete Cart Product

const deleteCartProduct = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {

        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart Not Found" });

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size == size &&
                p.color == color
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
            );
            await cart.save();
            return res.status(201).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("error while deleteing", error);
        res.status(500).send("server error");
    }
}

//Merge Guest cart to User Cart

const mergeCart = async (req, res) => {
    const { guestId } = req.body;
    try {

        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {
            if (guestCart.products.length == 0) {
                return res.status(400).json({ message: "Guest cart is empty" });

                if (userCart) {
                    guestCart.products.forEach((guestItem) => {
                        const productIndex = userCart.products.findIndex(
                            (item) =>
                                item.productId.toString() === guestItem.productId.toString() &&
                                item.size === guestItem.size
                                && item.color === guestItem.color
                        );

                        if (productIndex > -1) {
                            userCart.products[productIndex].quantity += guestItem.quantity;
                        } else {
                            userCart.products.push(guestItem);
                        }
                    });

                    userCart.totalPrice = userCart.products.reduce((acc, item) =>
                        acc + item.price * item.quantity, 0);
                };
                await userCart.save();

                try {
                    await Cart.findOneAndDelete({ guestId });
                } catch (error) {
                    console.log("Error deleting guest cart: ", error);
                }
                res.status(201).json(userCart);

            } else {

                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();

                res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                return res.status(201).json(userCart);
            }
            res.status(404).json({ message: "guest cart not found" });
        }
    } catch (error) {
        console.log("Error merging guest cart: ", error);
        res.status(500).send("server error");
    }
}

module.exports = {
    loadCartPage,
    addToCart,
    updateCart,
    deleteCartProduct,
    mergeCart,
}
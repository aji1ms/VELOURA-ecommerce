const Checkout = require("../../models/checkoutSchema");
const Order = require("../../models/orderSchema");
const Cart = require("../../models/cartItemsSchema");
const Product = require("../../models/ProductSchema");

//Checkout

const createCheckout = async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length == 0) {
        return res.status(400).json({ message: "no items in checkout" });
    }
    try {

        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
        });
        console.log(`checkout is created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.log("Error creating checkout: ", error);
        res.status(500).send("server error");
    }
}

//Payout

const payout = async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;
    try {

        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid payment Status" });
        }
    } catch (error) {
        console.log("Error while payouting: ", error);
        res.status(500).send("server error");
    }
}

//Place order

const placeOrder = async (req, res) => {
    try {

        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });  
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();
            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(200).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        console.log("Error while order placing",error);
        res.status(500).send("serve error");
    }
}

module.exports = {
    createCheckout,
    payout,
    placeOrder,
}
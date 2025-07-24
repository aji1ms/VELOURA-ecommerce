const Order = require("../../models/orderSchema");

//Orders

const orders = async (req, res) => {
    try {
        const order = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(order)
    } catch (error) {
        console.log("Error file getting order: ", error);
        res.status(500).json({ message: "server error" });
    }
}

//Order Details

const orderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            res.status(404).json({ message: "order not found" })
        }
        res.json(order)
    } catch (error) {
        console.log("Error while getting order details: ", error);
        res.status(500).send("server error")
    }
}

module.exports = {
    orders,
    orderDetails,
}
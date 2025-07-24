const Order = require("../../models/orderSchema");

//Orders

const orders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders);
    } catch (error) {
        console.log('Error while getting orders: ', error);
        res.status(500).send("server error");
    }
}

//Edit Orders

const editOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered =
                req.body.status == "Delivered" ? true : order.isDelivered;
            order.deliveredAt =
                req.body.status == "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.log("error while editing: ", error);
        res.send(500).send("server error")
    }
}

//Delete Order

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: "order removeed" });
        } else {
            res.status(404).send({ message: "order not found" });
        }
    } catch (error) {
        console.log("error while deleteing order: ", error);
        res.status(500).send("server error");
    }
}

module.exports = {
    orders,
    editOrder,
    deleteOrder,
}
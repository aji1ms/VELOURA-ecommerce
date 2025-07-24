const Subscribe = require("../../models/subscribeSchema");

const subscribe = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {

        let subscriber = await Subscribe.findOne({ email });
        if (subscriber) {
            res.status(400).json({ message: "Email already subscribed" });
        }

        subscriber = new Subscribe({ email });
        await subscriber.save();

        res.status(201).json({ message: "Successfully subscribed to the newsletter!" });
    } catch (error) {
        console.log("Error while subscribing: ", error);
    }
}

module.exports = {
    subscribe,
};
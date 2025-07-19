const User = require("../../models/UserSchema");
const jwt = require("jsonwebtoken");

// Register

const register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "user already exists" });

        user = new User({ name, email, phone, password });
        await user.save();

        const payload = { user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
            if (err) throw err;
            res.status(201).send({
                user: {
                    id: user._id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                },
                token,
            })
        });

    } catch (err) {
        console.log("Error Occured While Register: ", err);
        res.status(500).send("server error");
    }
}

// Login

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid email or password" });
        const isMatch = await user.matchPassword(password);

        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const payload = { user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
            if (err) throw err;
            res.send({
                user: {
                    id: user._id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                },
                token,
            })
        });

    } catch (error) {
        console.log("error occured while login: ", error);
        res.status(500).send("server error");
    }
}

const profile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.log("error occured loading profile", error);
        res.status(500).send("server error");
    }
}

module.exports = {
    register,
    login,
    profile,
} 
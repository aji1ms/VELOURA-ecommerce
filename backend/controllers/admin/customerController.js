const User = require("../../models/UserSchema");

//Get users

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users)
    } catch (error) {
        console.log("Error loading users: ", error);
        res.status(500).send("server error");
    }
}

//Add User

const addUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(404).json({ message: "Email already exists" });
        }

        user = new User({
            name,
            email,
            password,
            role: role || "customer",
        })
        await user.save();
        res.status(201).json({ message: "New user created successfully", user });
    } catch (error) {
        console.log("error while creating user: ", error);
        res.status(500).send("server error");
    }
}

//Edit User

const editUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
            },
            { new: true, runValidators: true, }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        console.log("Error while editing user: ", error.message);
        res.status(500).send("Server error");
    }
};

//Delete

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.deleteOne()
            res.json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        console.log("Error while deleting user: ", error);
        res.status(500).send("server error");
    }
}


module.exports = {
    getUsers,
    addUser,
    editUser,
    deleteUser,
}
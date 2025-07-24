const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const conectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//Connect to mongoDB
conectDB();

app.get("/", (req, res) => {
    res.send("WELCOME TO VELOURA API!");
});

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
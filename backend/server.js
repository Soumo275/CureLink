const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn.js"); 
const user = require("./routes/user");

// Middleware
app.use(express.json());

// Define routes
app.use("/api/v1", user);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
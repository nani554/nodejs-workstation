require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const dbConnection = require("./config/db");
app.use(express.json());
dbConnection();
const userRoutes = require("./routes/user-routes");

app.use("/api/users", userRoutes);

app.listen(PORT, (response) => {
    console.log(`Server Started & Listening at ${PORT}`);
})
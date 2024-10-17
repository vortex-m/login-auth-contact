const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectDB = require("./config/dbConnection.js");
const dotenv = require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/api/contact", require("./routes/contactRoute"));
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

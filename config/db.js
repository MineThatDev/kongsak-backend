require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then(() => {
      console.log("Database Connected!");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connectDB }

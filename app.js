require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 4000
const { connectDB } = require("./config/db.js");
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");
const shippingAddressRouter = require("./routes/shipping-address.js");
const warrantyCardRouter = require("./routes/warranty-card.js");
const orderRouter = require("./routes/order.js");
const orderProductRouter = require("./routes/order-product.js");
const orderStatusRouter = require("./routes/order-status.js");
const fileRouter = require("./routes/file.js");
const googleAuthRouter = require("./routes/google-auth.js")


connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/shipping-addresses", shippingAddressRouter);
app.use("/warranty-cards", warrantyCardRouter);
app.use("/orders", orderRouter);
app.use("/order-products", orderProductRouter);
app.use("/order-statuses", orderStatusRouter);
app.use("/files", fileRouter);
app.use("/google-auth", googleAuthRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const gigRoute = require("./routes/gig");
const reviewRoute = require("./routes/review");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const orderRoute = require("./routes/order");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Work ☻"))
  .catch((err) => console.log(`Error ${err.message}`));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/gig", gigRoute);
app.use("/api/review", reviewRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/order", orderRoute);

app.listen(5000, () => console.log("Server Running ☻"));

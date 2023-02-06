const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const authClientsRoute = require("./routes/auth-clients");
const driversRoute = require("./routes/drivers");
const clientsRoute = require("./routes/clients");
const activesRoute = require("./routes/actives");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB...");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/authclients", authClientsRoute);
app.use("/api/drivers", driversRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/actives", activesRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  connect();
  console.log(`connected to the backend...`);
});

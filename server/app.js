const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
app.use(cookieParser());
//middleware
app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: ["https://jobhubadmin.vercel.app/", "http://localhost:5173"],
    credentials: true, // Allow cookies
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes

//for admin
const adminRoute = require("./src/routes/admin.route");

app.use("/api/admin", adminRoute); //admin login

module.exports = app;

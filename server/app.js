const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: ["https://jobhub-adminn.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());

//routes

//for admin
const adminRoute = require("./src/routes/admin.route");

app.use("/api/admin", adminRoute); //admin login

module.exports = app;

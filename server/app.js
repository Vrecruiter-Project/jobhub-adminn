// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const app = express();

// const dotenv = require("dotenv");
// dotenv.config();
// app.use(cookieParser());
// //middleware
// app.use(bodyParser.json());
// app.use(express.json());

// app.use(
//   cors({
//     origin: ["https://jobhubadmin.vercel.app/","http://localhost:5173"],
//     credentials: true, // Allow cookies
//   })
// );

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// //routes

// //for admin
// const adminRoute = require("./src/routes/admin.route");

// app.use("/api/admin", adminRoute); //admin login

// module.exports = app;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: ["https://jobhubadmin.vercel.app", "http://localhost:5173"], // Removed trailing slash
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // Dynamic CORS
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
const adminRoute = require("./src/routes/admin.route");
app.use("/api/admin", adminRoute);

module.exports = app;

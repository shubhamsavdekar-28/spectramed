const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");
//MY ROUTES
const labtestRoutes = require("./routes/labtest");
const phoneRoutes = require("./routes/phone");

//DB import
const config = require("./db");

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

//MY ROUTES
app.use(express.static(path.join(__dirname, "build")));
app.use("/api", labtestRoutes);
app.use("/api", phoneRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen("3000", () => {
  console.log("Server started at Port 3000");
});

app.get("/testserver", (req, res) => {
  res.send("test route working");
});

module.exports = config;

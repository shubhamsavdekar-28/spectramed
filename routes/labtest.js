var express = require("express");
var app = express();
const { enquiry } = require("../controllers/labtest");
const { reachus } = require("../controllers/labtest");

app.post("/enquiry", enquiry);
app.post("/reachus", reachus);

module.exports = app;

var express = require("express");
var app = express();
const {
  no_phone_attachment,
  attachment_phone,
  customer_phone,
} = require("../controllers/phone");

app.post("/mail_no_attach", no_phone_attachment);
app.post("/mail_attach", attachment_phone);
app.post("/mail_cust", customer_phone);

module.exports = app;

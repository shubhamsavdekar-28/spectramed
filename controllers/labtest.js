const { v4: uuidv4 } = require("uuid");
const sql = require("mssql");
const config = require("../db");
const { no_attachment, customer_reachus } = require(".././Helper/mailer");
const { attachment, customer } = require(".././Helper/mailer");
const ImageDataURI = require("image-data-uri");

exports.enquiry = (req, res) => {
  const { name, email, phone, test_type, test_name, pincode, photo } = req.body;
  console.log(name, email, phone, test_type, test_name, pincode, photo);
  let date = new Date();
  const traffic = "web";
  let formatteddate =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  if (photo === "") {
    const no_photo = "no_photo";

    //config.options.enableArithAbort = false;
    sql.connect(config, function (err) {
      if (err) console.log(err);
      var sqlRequest = new sql.Request();
      let sqlQuery = `insert into enquiry (Date,Name,Email,Phone,Test_type,Test_name,Pincode,prescription,Traffic) values('${formatteddate}','${name}','${email}','${phone}','${test_type}','${test_name}','${pincode}','${no_photo}','${traffic}')`;

      sqlRequest.query(sqlQuery, function (err, data) {
        if (err) {
          // let errorQuery = `insert into error_logs(Name,Phone,Error) values('${name}','${phone}','${err}')`;
          // sqlRequest.query(errorQuery, function (error, data) {
          //   if (error) {
          //     console.log("DATABASE ERROR", error);
          //   } else {
          //     console.log("saved error in db");
          //   }
          // });

          console.log(err);
          return res.status(400).json({
            err: "Not able to save in DB",
          });
        } else {
          console.log(data);
          res.json("successfully added in DB");
          no_attachment(name, email, phone, test_type, test_name, pincode);
          customer(name, email);
        }

        //close the connection
        sql.close();
      });
    });
  } else {
    console.log("SAVED IN FOLDER");
    var id = uuidv4();
    const filePath = "upload_prescription/" + id;
    ImageDataURI.outputFile(photo, filePath)

      .then((res) => {
        console.log("DATA URI SUCCCESS", res);
        const ext = res.split(".");
        console.log("EXT", ext);
        id = id + "." + ext[1];
        console.log("id", id);
      })
      .catch((err) => console.log("DATA URI", err));

    sql.connect(config, function (err) {
      if (err) console.log(err);
      var sqlRequest = new sql.Request();
      let sqlQuery = `insert into enquiry (Date,Name,Email,Phone,Test_type,Test_name,Pincode,prescription,Traffic) values('${formatteddate}','${name}','${email}','${phone}','${test_type}','${test_name}','${pincode}','${id}','${traffic}')`;

      sqlRequest.query(sqlQuery, function (err, data) {
        if (err) {
          console.log(err);
          return res.status(400).json({
            err: "Not able to save in DB",
          });
        } else {
          res.json("successfully added in db");
          console.log("BEFORE ATTACHMENt");
          attachment(name, email, phone, test_type, test_name, id, pincode);
          customer(name, email);
        }

        //close the connection
        sql.close();
      });
    });
  }
};

exports.reachus = (req, res) => {
  const { name, phone } = req.body;
  console.log(name, phone);
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var sqlRequest = new sql.Request();
    let sqlQuery = `insert into reachus (r_Name,r_Phone) values ('${name}','${phone}')`;
    sqlRequest.query(sqlQuery, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "Not able to save in DB",
        });
      } else {
        res.json("successfully added in db");
        customer_reachus(name, phone);
      }

      //close the connection
      sql.close();
    });
  });
};

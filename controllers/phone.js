const nodemailer = require("nodemailer");
exports.no_phone_attachment = (req, res) => {
  console.log(req.body);
  res.send(req.body);
  const { name, email, phone, test_type, test_name, pincode } = req.body;
  console.log(name, email, phone, test_type, test_name, pincode);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "techspectramed@gmail.com",
    to: "khyati@spectramedglobal.com,shubham@bookmyticket.com",
    subject: `Spectramed registration- ${test_type}`,
    // text: `Name: ${name}     Email: ${email}     Phone: ${phone}     Test_type: ${test_type}      Test_name: ${test_name}        Pincode: ${pincode}`,
    html: `
    <h2>New Booking</h2>
    <table style="border: 1px solid black;">
    <tr>
    <th style="border-bottom: 1px solid black;">Name</th><th style="border-bottom: 1px solid black;">Phone</th><th style="border-bottom: 1px solid black;">Email</th><th style="border-bottom: 1px solid black;">Test_type</th><th style="border-bottom: 1px solid black;">Test_name</th><th style="border-bottom: 1px solid black;">Pincode</th>
    </tr>
    <tr>
    <td style="padding:10px;">${name}</td><td style="padding:10px;">${phone}</td><td style="padding:10px;">${email}</td><td style="padding:10px;"">${test_type}</td><td style="padding:10px;"">${test_name}</td><td style="padding:10px;"">${pincode}</td>
    </tr>
    </table>
    `,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
      res.send({ err });
    } else {
      res.send("Message sent", data);
      console.log("Message sent");
      console.log(data);
    }
  });
};

exports.attachment_phone = (req, res) => {
  const { name, email, phone, test_type, test_name, pincode, id } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  var attachments = [
    {
      filename: `${name}.jpg`,
      path: `upload_prescription/${id}`,
      contentType: "application/jpg",
    },
  ];
  const mailOptions = {
    from: "info@spectramedglobal.com",
    to: "khyati@spectramedglobal.com,shubham@bookmyticket.com",
    subject: `Spectramed registration- ${test_type}`,
    // text: `Name: ${name}     Email: ${email}     Phone: ${phone}     Test_type: ${test_type}      Test_name: ${test_name} Pincode: ${pincode}`,
    html: `<h2>New Booking</h2>
    <table style="border: 1px solid black;">
    <tr>
    <th style="border-bottom: 1px solid black;">Name</th><th style="border-bottom: 1px solid black;">Phone</th><th style="border-bottom: 1px solid black;">Email</th><th style="border-bottom: 1px solid black;">Test_type</th><th style="border-bottom: 1px solid black;">Test_name</th><th style="border-bottom: 1px solid black;">Pincode</th>
    </tr>
    <tr>
    <td style="padding:10px;">${name}</td><td style="padding:10px;">${phone}</td><td style="padding:10px;">${email}</td><td style="padding:10px;"">${test_type}</td><td style="padding:10px;"">${test_name}</td><td style="padding:10px;"">${pincode}</td>
    </tr>
    </table>
    `,
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent");
      console.log(data);
    }
  });
};

exports.customer_phone = (req, res) => {
  const { name, email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "info@spectramedglobal.com",
    to: `${email}`,
    subject: "We Received your Submission",
    html: `<h2>Hello ${name},</h2>
    <p>Thank You for reaching us. We are happy to help you!.
    </p>
   
    <p>In case of any further test related bookings, Call on our Toll Free Number:  <a href="tel:18002669999">1800-266-9999</a></p>
    `,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent");
      console.log(data);
    }
  });
};

exports.customer_reachus = (name, phone) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: "techspectramed@gmail.com",
    to: "shahsunny311@gmail.com",
    subject: `Customer Enquiry`,
    html: `
    <h2>New Enquiry</h2>
    <table style="border: 1px solid black;">
    <tr>
    <th style="border-bottom: 1px solid black;">Name</th><th style="border-bottom: 1px solid black;">Phone</th>
    </tr>
    <tr>
    <td style="padding:10px;">${name}</td><td style="padding:10px;">${phone}</td>
    </tr>
    </table>
    `,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent");
      console.log(data);
    }
  });
};

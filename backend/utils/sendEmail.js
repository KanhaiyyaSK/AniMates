const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log("inside sendmail");
  const transporter = nodeMailer.createTransport({
    // host: process.env.SMPT_HOST,
    // port: process.env.SMPT_PORT,
    // // service: process.env.SMPT_SERVICE,
    // secure: true,
    service: "gmail",
    auth: {
      user: "kanhaiyyashendage9763@gmail.com",
      pass: "eikaujeejvwtozfq",
    },
  });
 
  const mailOptions = {
    from: "kanhaiyyashendage9763@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log("after mailOptions");

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("err is ", err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;

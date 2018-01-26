const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;
const nodemailer = require('nodemailer');
const Email = require('./data/persistEmail');

app.use(bodyParser.json());
mongoose.connect(keys.mongoURI);
app.post('/',(req, res) => {
    console.log(req.body.Information)
    
    const emailContents = {
      Information: req.body.Information === undefined ?  "Place Holder Text" : req.body.Information
    }

    const mailOptions = {
      from: keys.emailFrom,
      to: keys.emailTo,
      subject: 'Joshs Information',
      text: `Hi Josh this is an email about, ${emailContents.Information}`
    };

    const transporter = nodemailer.createTransport({
        service: keys.service,
        auth: {
          user: keys.userName,
          pass: keys.password
        }
    });
    transporter.sendMail(mailOptions, (error, info) => {
        console.log( error ? error : `Email sent: ${info.response}`)
        res.sendStatus(200);
        return;
      });

    Email.persistEmail(mailOptions, (err, mailOptions) => {
      if(err){
          throw err;
      }
      res.json(mailOptions);
  });

});
  
app.listen(PORT);

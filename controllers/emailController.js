const
  nodemailer = require('nodemailer')
;

module.exports = {

  quote: (req,res) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: 'premierevaletservice.la@gmail.com',
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    
    let HelperOptions = {
      from: `"Premiere Valet Service" <premierevaletservice.la@gmail.com>`,
      to: 'matthew.westenhaver@gmail.com',
      subject: `Quote Request from ${req.body.name}`,
      html: `Below are the details for the quote request:<br /><br /><b>Name:</b> ${req.body.name}<br /><b>Email:</b> ${req.body.email}<br /><b>Phone:</b> ${req.body.phone}<br /><b>Event Address:</b> ${req.body.address}, ${req.body.city} ${req.body.zipcode}<br /><b>Event Date:</b> ${req.body.eventDate}<br /><b>Event Type:</b> ${req.body.eventType}<br /><b>Number of Guests:</b> ${req.body.guests}<br /><b>Number of Cars:</b> ${req.body.cars}<br /><b>Parking Conditions & Comments:</b> ${req.body.comments}<br /><b>Referral:</b> ${req.body.reference}<br />` 
    }

    transporter.sendMail(HelperOptions, (error, info) => {
      if(error) {
        return console.log(error)
      }
      console.log(info)
    });
  
    let ConfirmationOptions = {
      from: `"Premiere Valet Service" <premierevaletservice.la@gmail.com>`,
      to: req.body.email,
      subject: `Your Quote Request Was Received`,
      html: `Hi ${req.body.name}!<br /><br />Your quote request was received. We will get back to you as soon as possible!<br /><br />Below are the quote details that you submitted:<br /><br /><b>Name:</b> ${req.body.name}<br /><b>Email:</b> ${req.body.email}<br /><b>Phone:</b> ${req.body.phone}<br /><b>Event Address:</b> ${req.body.address}, ${req.body.city} ${req.body.zipcode}<br /><b>Event Date:</b> ${req.body.eventDate}<br /><b>Event Type:</b> ${req.body.eventType}<br /><b>Number of Guests:</b> ${req.body.guests}<br /><b>Number of Cars:</b> ${req.body.cars}<br /><b>Parking Conditions & Comments:</b> ${req.body.comments}<br /><b>Referral:</b> ${req.body.reference}<br /><br />Thank you,<br />The Premiere Valet Service, Inc. Team<br /><br /><b>DO NOT REPLY TO THIS EMAIL ADDRESS. This inbox is not monitored.`
    }
  
    transporter.sendMail(ConfirmationOptions, (error2, info2) => {
      if(error2) {
        return console.log(error2)
      }
      console.log(info2)
    })
  
    res.json({message:'Comment received.'})
  },

  work: (req, res) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: 'premierevaletservice.la@gmail.com',
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    
    let HelperOptions = {
      from: `"Premiere Valet Service" <premierevaletservice.la@gmail.com>`,
      to: 'matthew.westenhaver@gmail.com',
      subject: `Job Application from ${req.body.firstName} ${req.body.lastName}`,
      html: `Below are the submitted application details:<br /><br /><b>Name:</b> ${req.body.firstName} ${req.body.lastName}<br /><b>Email:</b> ${req.body.email}<br /><b>Phone:</b> ${req.body.phone}<br /><b>Reference:</b> ${req.body.reference}<br /><b>Education:</b> ${req.body.education}<br /><b>Skills:</b> ${req.body.skills}<br /><b>About:</b> ${req.body.about}<br /><b>Location:</b> ${req.body.location}<br /><b>Resume:</b> ${req.body.resume}<br /><br /><b>REPLY TO:</b> ${req.body.email}` 
    }

    transporter.sendMail(HelperOptions, (error, info) => {
      if(error) {
        return console.log(error)
      }
      console.log(info)
    });
  
    let ConfirmationOptions = {
      from: `"Premiere Valet Service" <premierevaletservice.la@gmail.com>`,
      to: req.body.email,
      subject: `Your Job Application Was Received`,
      html: `Hi ${req.body.firstName},<br /><br />Your job application was received by our team. We will get back to you as soon as possible!<br /><br />Below is a copy of your submitted information for your records:<br /><br /><b>Name:</b> ${req.body.firstName} ${req.body.lastName}<br /><b>Email:</b> ${req.body.email}<br /><b>Phone:</b> ${req.body.phone}<br /><b>Reference:</b> ${req.body.reference}<br /><b>Education:</b> ${req.body.education}<br /><b>Skills:</b> ${req.body.skills}<br /><b>About:</b> ${req.body.about}<br /><b>Location:</b> ${req.body.location}<br /><b>Resume:</b> ${req.body.resume}<br /><br />Thank you,<br />The Premiere Valet Service, Inc. Team<br /><br /><b>DO NOT REPLY TO THIS EMAIL ADDRESS. This inbox is not monitored.`
    }
  
    transporter.sendMail(ConfirmationOptions, (error2, info2) => {
      if(error2) {
        return console.log(error2)
      }
      console.log(info2)
    })
  
    res.json({message:'Comment received.'})
  }
}
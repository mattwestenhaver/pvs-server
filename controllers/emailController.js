const nodemailer = require('nodemailer')
const Quote = require('../models/Quote.js')

const FROM =
    '"Premiere Valet Services, Inc." <noreply@premierevaletparking.com>'

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    secure: true,
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
    },
})

module.exports = {
    quote: async (req, res) => {
        Quote.create(req.body).catch((err) => console.log(err))

        let mailOptions = {
            from: FROM,
            to: 'info@premierevaletparking.com',
            subject: `Quote Request from ${req.body.name}`,
            html: `Below are the details for the quote request:<br /><br /><b>Name:</b> ${req.body.name}<br /><b>Email:</b> ${req.body.email}<br /><b>Phone:</b> ${req.body.phone}<br /><b>Event Address:</b> ${req.body.address}, ${req.body.city} ${req.body.zipcode}<br /><b>Event Date:</b> ${req.body.eventDate}<br /><b>Event Type:</b> ${req.body.eventType}<br /><b>Number of Guests:</b> ${req.body.guests}<br /><b>Number of Cars:</b> ${req.body.cars}<br /><b>Arrival Time:</b> ${req.body.arrival}<br /><b>Departure Time:</b> ${req.body.departure}<br /><b>Parking Conditions & Comments:</b> ${req.body.comments}<br /><b>Referral:</b> ${req.body.reference}<br />`,
        }

        try {
            await smtpTransport.sendMail(mailOptions)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message:
                    'Your quote request could not be sent. Please try again.',
            })
        }

        let confirmOptions = {
            from: FROM,
            to: req.body.email,
            subject: `Your Quote Request Was Received`,
            html: `Hi ${req.body.name}!<br /><br />Your quote request was received. We will get back to you as soon as possible!<br /><br />Below are the quote details that you submitted:<br /><br /><b>Name:</b> ${req.body.name}<br /><b>Email:</b> ${req.body.email}<br /><b>Phone:</b> ${req.body.phone}<br /><b>Event Address:</b> ${req.body.address}, ${req.body.city} ${req.body.zipcode}<br /><b>Event Date:</b> ${req.body.eventDate}<br /><b>Event Type:</b> ${req.body.eventType}<br /><b>Number of Guests:</b> ${req.body.guests}<br /><b>Number of Cars:</b> ${req.body.cars}<br /><b>Arrival Time:</b> ${req.body.arrival}<br /><b>Departure Time:</b> ${req.body.departure}<br /><b>Parking Conditions & Comments:</b> ${req.body.comments}<br /><b>Referral:</b> ${req.body.reference}<br /><br />Thank you,<br />The Premiere Valet Services, Inc. Team<br /><br /><b>DO NOT REPLY TO THIS EMAIL ADDRESS. This inbox is not monitored.`,
        }

        smtpTransport
            .sendMail(confirmOptions)
            .catch((error) => console.log(error))

        res.json({ success: true, message: 'Quote received.' })
    },

    work: async (req, res) => {
        let mailOptions = {
            from: FROM,
            to: 'ryan@premierevaletparking.com',
            subject: `Job Application from ${req.body.firstName} ${req.body.lastName}`,
            html: `Below are the submitted application details:<br /><br /><b>Name:</b> ${req.body.firstName} ${req.body.lastName}<br /><b>Email:</b> ${req.body.email}<br /><b>Phone:</b> ${req.body.phone}<br /><b>Reference:</b> ${req.body.reference}<br /><b>Education:</b> ${req.body.education}<br /><b>Skills:</b> ${req.body.skills}<br /><b>About:</b> ${req.body.about}<br /><b>Location:</b> ${req.body.location}<br /><b>Resume:</b> ${req.body.resume}<br /><br /><b>REPLY TO:</b> ${req.body.email}`,
        }

        try {
            await smtpTransport.sendMail(mailOptions)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message:
                    'Your job application could not be sent. Please try again.',
            })
        }

        let confirmOptions = {
            from: FROM,
            to: req.body.email,
            subject: `Your Job Application Was Received`,
            html: `Hi ${req.body.firstName},<br /><br />Your job application was received by our team. We will get back to you as soon as possible!<br /><br />Below is a copy of your submitted information for your records:<br /><br /><b>Name:</b> ${req.body.firstName} ${req.body.lastName}<br /><b>Email:</b> ${req.body.email}<br /><b>Phone:</b> ${req.body.phone}<br /><b>Reference:</b> ${req.body.reference}<br /><b>Education:</b> ${req.body.education}<br /><b>Skills:</b> ${req.body.skills}<br /><b>About:</b> ${req.body.about}<br /><b>Location:</b> ${req.body.location}<br /><b>Resume:</b> ${req.body.resume}<br /><br />Thank you,<br />The Premiere Valet Services, Inc. Team<br /><br /><b>DO NOT REPLY TO THIS EMAIL ADDRESS. This inbox is not monitored.`,
        }

        smtpTransport
            .sendMail(confirmOptions)
            .catch((error) => console.log(error))

        res.json({ success: true, message: 'Info received.' })
    },
}

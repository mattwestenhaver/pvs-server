const nodemailer = require('nodemailer')

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

// Form input goes into emails we send, so escape it before it lands in HTML
const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

const isBlank = (value) =>
    value === undefined || value === null || String(value).trim() === ''

const joinParts = (parts, separator) =>
    parts.filter((part) => !isBlank(part)).join(separator)

// Builds the HTML and plain-text versions of an email from intro/outro
// paragraphs and a list of [label, value] rows. Empty rows are skipped.
const buildEmail = ({ intro, fields, outro = [] }) => {
    const rows = fields.filter(([, value]) => !isBlank(value))

    const paragraphs = (lines) =>
        lines
            .map(
                (line) =>
                    `<p style="white-space: pre-line;">${escapeHtml(line)}</p>`,
            )
            .join('')

    const html = `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #222;">
${paragraphs(intro)}
<table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
${rows
    .map(
        ([label, value]) =>
            `<tr><td style="font-weight: bold; vertical-align: top; white-space: nowrap;">${escapeHtml(label)}</td><td style="white-space: pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join('\n')}
</table>
${paragraphs(outro)}
</div>`

    const text = [
        intro.join('\n\n'),
        rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
        outro.join('\n\n'),
    ]
        .filter((section) => section !== '')
        .join('\n\n')

    return { html, text }
}

const quoteFields = (body) => [
    ['Name', body.name],
    ['Email', body.email],
    ['Phone', body.phone],
    [
        'Event Address',
        joinParts(
            [body.address, joinParts([body.city, body.zipcode], ' ')],
            ', ',
        ),
    ],
    ['Event Date', body.eventDate],
    ['Event Type', body.eventType],
    ['Number of Guests', body.guests],
    ['Number of Cars', body.cars],
    ['Arrival Time', body.arrival],
    ['Departure Time', body.departure],
    ['Parking Conditions & Comments', body.comments],
    ['Referral', body.reference],
]

const workFields = (body) => [
    ['Name', joinParts([body.firstName, body.lastName], ' ')],
    ['Email', body.email],
    ['Phone', body.phone],
    ['Reference', body.reference],
    ['Education', body.education],
    ['Skills', body.skills],
    ['About', body.about],
    ['Location', body.location],
    ['Resume', body.resume],
]

const SIGN_OFF = [
    'Questions? Just reply to this email.',
    'Thank you,\nThe Premiere Valet Services, Inc. Team',
]

module.exports = {
    quote: async (req, res) => {
        const fields = quoteFields(req.body)

        const mailOptions = {
            from: FROM,
            to: process.env.QUOTE_EMAIL_TO,
            replyTo: req.body.email,
            subject: `Quote Request from ${req.body.name}`,
            ...buildEmail({
                intro: ['Below are the details for the quote request:'],
                fields,
            }),
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

        const confirmOptions = {
            from: FROM,
            to: req.body.email,
            replyTo: process.env.QUOTE_EMAIL_TO,
            subject: 'Your Quote Request Was Received',
            ...buildEmail({
                intro: [
                    `Hi ${req.body.name}!`,
                    'Your quote request was received. We will get back to you as soon as possible!',
                    'Below are the quote details that you submitted:',
                ],
                fields,
                outro: SIGN_OFF,
            }),
        }

        smtpTransport
            .sendMail(confirmOptions)
            .catch((error) => console.log(error))

        res.json({ success: true, message: 'Quote received.' })
    },

    work: async (req, res) => {
        const fields = workFields(req.body)

        const mailOptions = {
            from: FROM,
            to: process.env.JOB_EMAIL_TO,
            replyTo: req.body.email,
            subject: `Job Application from ${req.body.firstName} ${req.body.lastName}`,
            ...buildEmail({
                intro: ['Below are the submitted application details:'],
                fields,
            }),
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

        const confirmOptions = {
            from: FROM,
            to: req.body.email,
            replyTo: process.env.JOB_EMAIL_TO,
            subject: 'Your Job Application Was Received',
            ...buildEmail({
                intro: [
                    `Hi ${req.body.firstName},`,
                    'Your job application was received by our team. We will get back to you as soon as possible!',
                    'Below is a copy of your submitted information for your records:',
                ],
                fields,
                outro: SIGN_OFF,
            }),
        }

        smtpTransport
            .sendMail(confirmOptions)
            .catch((error) => console.log(error))

        res.json({ success: true, message: 'Info received.' })
    },
}

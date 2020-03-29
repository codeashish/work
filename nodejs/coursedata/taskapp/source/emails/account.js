const sendgridapi = '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'
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(sendgridapi);

// sgMail.send({
//     to: "codeasg@protonmail.com",
//     from: "ashishboss9977@gmail.com",
//     subject: "This is Subject",
//     text: "Its a text"
// })

const sendWelcomemail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ashishboss9977@gmail.com',
        subject: "Welcome To the App",
        text: 'Welcome to the' + name + 'task manager app.',
    })
}

module.exports = sendWelcomemail
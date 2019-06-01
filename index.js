const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
    console.log(req.body);
    nodemailer.createAccount((error, account) => {
        const htmlEmail = `
            <h3>Contact Details</h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Email: ${req.body.mail}</li>
                <li>Subject: ${req.body.subject}</li>
            </ul>
            <h3>Message</h3>
            <p>${req.body.message}</p>
        `
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secore: true,
            auth: {
                user: process.env.AUTH_USER,
                pass: process.env.AUTH_PASS
            }
        });

        let mailOptions = {
            from: 'Carlos Olivares <lionsfield001@gmail.com>',
            to: 'english.workshop@yahoo.ca',
            subject: 'Website Submission',
            text: 'You have a submission with the following detials... Name: '+req.body.name+ ' Email: '+req.body.mail+ 'Message: '+req.body.message,
            html: '<p>You have a submission with the following detials...</p><ul><li>Nombre: '+req.body.name+'</li><li>Asunto: '+req.body.subject+'</li><li>Correo Electrónico: '+req.body.mail+'</li><li>Mensaje: '+req.body.message+'</li></ul>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.redirect('/');
            } else {
                console.log('Message Sent: '+info.response);
                res.redirect('/');
            }
        });
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
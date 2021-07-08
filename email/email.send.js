const nodemailer = require('nodemailer');

//credentials for email account to send mails from
const credentials = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    //requireTLS: true,
    auth: {
        //user data
        user: 'unloccode@gmail.com',
        pass: 'suven2x4'
    }
};
//set up nodemailer with credentials sendMail()
const transporter = nodemailer.createTransport(credentials);
//async to use await
module.exports = async(to, content) => {
    //from and to address for the email to be sent
    const contacts = {
        from: 'unloccode@gmail.com',
        to
    }
    //combine content and contact into a single object to be passed to nodemailer
    const email = Object.assign({}, content, contacts);
    //send email
    await transporter.sendMail(email);
    console.log("Mail Sent Successfully!");
}
const nodemailer=require('nodemailer')
const emailSending= async options=>{
    const transport ={
        host: process.env.MAIL_HOST,
        port:  process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }


      }
     const transporter=nodemailer.createTransport(transport)
      
    const message={
        from:`${process.env.MAIL_USERNAME} <${process.env.USER_EMAIL}>`,
        to:options.toEmail,
        subject:options.subject,
  
        text:options.message
      }
await transporter.sendMail(message)
}

module.exports=emailSending